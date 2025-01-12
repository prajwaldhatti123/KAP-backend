"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./models/user.model");
const refresh_token_model_1 = require("./models/refresh-token.model");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("@nestjs/cache-manager");
const crypto_utils_1 = require("../utils/crypto.utils");
const email_service_service_1 = require("../email-service/email-service.service");
let AuthService = class AuthService {
    constructor(cacheManager, userModel, refreshTokenModel, jwtService, emailService) {
        this.cacheManager = cacheManager;
        this.userModel = userModel;
        this.refreshTokenModel = refreshTokenModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async create(createUserDto) {
        const { email, password, otp } = createUserDto;
        const checkEmail = await this.userModel.findOne({ email: email });
        if (checkEmail) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const storedOtp = await this.cacheManager.get(`otp_${email}`);
        if (!storedOtp || storedOtp !== otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        user.save();
        await this.cacheManager.del(`otp_${email}`);
        return 'User created successfully';
    }
    async initiateRegistration(email) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered');
        }
        const otp = this.generateOtp();
        await this.cacheManager.set(`otp_${email}`, otp, 600000);
        const result = await this.emailService.sendOtpMail(email, 'Account Verification', 'Please use the below OTP valid for only 10 minutes to login into KAP_FIT and verify yourself', otp);
        if (result)
            return 'Otp sent successfully to registered email';
        else
            throw new common_1.InternalServerErrorException('Internal server occurred while sending mail');
    }
    async login(LoginDto) {
        const { email, password } = LoginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const result = await this.generateAccessToken(user._id.toString());
        await this.saveLoginHistory(user._id.toString());
        return {
            ...result,
            user: {
                email: user.email,
                name: user.name || '',
                phone_number: user.phone_number || '',
                bio: user.bio || '',
                status: user.status,
                last_login: new Date(),
                preferences: user.preferences,
                profile_pic: user.profile_pic || '',
                gender: user.gender || '',
            },
        };
    }
    async logout(userId, accessToken) {
        const sessions = await this.refreshTokenModel.find({ userId });
        if (sessions.length === 0) {
            throw new common_1.InternalServerErrorException('No sessions found for the user');
        }
        for (const session of sessions) {
            const isMatch = await bcrypt.compare(accessToken, session.sessionId);
            if (isMatch) {
                await this.refreshTokenModel.findByIdAndDelete(session._id);
                const decodedToken = this.jwtService.decode(accessToken);
                const expiresAt = decodedToken.exp * 1000;
                const blacklistKey = `blacklisted_token_${accessToken}`;
                await this.cacheManager.set(blacklistKey, true, expiresAt - Date.now());
                return 'Logged out successfully';
            }
        }
        throw new common_1.UnauthorizedException('Invalid session');
    }
    async generateAccessToken(userId) {
        const accessToken = this.jwtService.sign({ userId });
        const refreshToken = (0, uuid_1.v4)();
        await this.storeSessionInfo(accessToken, userId, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    async storeSessionInfo(accessToken, userId, refreshToken) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const sessionId = await crypto_utils_1.default.getHash(accessToken, 10);
        const token = new this.refreshTokenModel({
            userId,
            token: refreshToken,
            sessionId,
            expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });
        token.save();
    }
    async refreshTokens(refreshToken) {
        const token = await this.refreshTokenModel.findOneAndDelete({
            token: refreshToken,
            expiryDate: { $gt: new Date() },
        });
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.userModel.findById(token.userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.refreshTokenModel.deleteMany({ userId: token.userId });
        const result = this.generateAccessToken(user._id.toString());
        return result;
    }
    async saveLoginHistory(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        user.last_login = new Date();
        user.save();
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.UserProfile.name)),
    __param(2, (0, mongoose_1.InjectModel)(refresh_token_model_1.RefreshToken.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        email_service_service_1.EmailServiceService])
], AuthService);
//# sourceMappingURL=auth.service.js.map