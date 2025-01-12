import { UserProfile } from './models/user.model';
import { RefreshToken } from './models/refresh-token.model';
import { Model } from 'mongoose';
import { LoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Cache } from 'cache-manager';
import { EmailServiceService } from 'src/email-service/email-service.service';
export declare class AuthService {
    private cacheManager;
    private userModel;
    private refreshTokenModel;
    private jwtService;
    private emailService;
    constructor(cacheManager: Cache, userModel: Model<UserProfile>, refreshTokenModel: Model<RefreshToken>, jwtService: JwtService, emailService: EmailServiceService);
    create(createUserDto: CreateUserDto): Promise<string>;
    initiateRegistration(email: string): Promise<string>;
    login(LoginDto: LoginDto): Promise<Object>;
    logout(userId: string, accessToken: string): Promise<string>;
    generateAccessToken(userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    storeSessionInfo(accessToken: string, userId: string, refreshToken: string): Promise<void>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    saveLoginHistory(userId: string): Promise<void>;
    private generateOtp;
}
