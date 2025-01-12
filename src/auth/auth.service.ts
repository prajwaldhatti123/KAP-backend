import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from './models/user.model';
import { RefreshToken } from './models/refresh-token.model';
import { Model } from 'mongoose';
import { LoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { last } from 'rxjs';
import { profile } from 'console';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import CryptoUtils from 'src/utils/crypto.utils';
import { EmailServiceService } from 'src/email-service/email-service.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(UserProfile.name) private userModel: Model<UserProfile>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
    private emailService: EmailServiceService,
  ) {}

  async initiateRegistration(email: string) {
    // Step 1: Check if the email is already registered
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // Step 2: Generate and send OTP
    const otp = this.generateOtp();
    await this.cacheManager.set(`register_otp_${email}`, otp, 600000);
    const result = await this.emailService.sendOtpMail(
      email,
      'Account Verification',
      'Please use the below OTP valid for only 10 minutes to login into KAP_FIT and verify yourself',
      otp,
    );
    if (result) return 'Otp sent successfully to registered email';
    else
      throw new InternalServerErrorException(
        'Internal server occurred while sending mail',
      );
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, otp } = createUserDto;

    const checkEmail = await this.userModel.findOne({ email: email });
    if (checkEmail) {
      throw new BadRequestException('Email already exists');
    }

    // verify the otp
    const storedOtp = await this.cacheManager.get(`register_otp_${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    user.save();
    await this.cacheManager.del(`register_otp_${email}`);
    return 'User created successfully';
  }

  async login(LoginDto: LoginDto): Promise<Object> {
    const { email, password } = LoginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
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

  async logout(userId: string, accessToken: string) {
    // Find all sessions for the user
    const sessions = await this.refreshTokenModel.find({ userId });

    if (sessions.length === 0) {
      throw new InternalServerErrorException('No sessions found for the user');
    }

    // Compare the accessToken with each sessionId
    for (const session of sessions) {
      const isMatch = await bcrypt.compare(accessToken, session.sessionId);
      if (isMatch) {
        // Delete the matching session
        await this.refreshTokenModel.findByIdAndDelete(session._id);

        // Blacklist the accessToken
        const decodedToken = this.jwtService.decode(accessToken) as {
          exp: number;
        };
        const expiresAt = decodedToken.exp * 1000;
        const blacklistKey = `blacklisted_token_${accessToken}`;
        await this.cacheManager.set(blacklistKey, true, expiresAt - Date.now());

        return 'Logged out successfully';
      }
    }

    // If no matching session is found
    throw new UnauthorizedException('Invalid session');
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate: { $gt: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.userModel.findById(token.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.refreshTokenModel.deleteMany({ userId: token.userId });
    const result = this.generateAccessToken(user._id.toString());
    return result;
  }

  forgotPasswordOtp = async (email: string) => {
    // Step 1: Check if the email is already registered
    const existingUser = await this.userModel.findOne({ email });
    if (!existingUser) {
      throw new BadRequestException('No account exists please signup');
    }

    // Step 2: Generate and send OTP
    const otp = this.generateOtp();
    await this.cacheManager.set(`forgot_password_otp_${email}`, otp, 600000);
    const result = await this.emailService.sendForgotOtpMail(
      existingUser.name,
      email,
      'Password reset',
      'Please use the below OTP valid for only 10 minutes to reset your password and login into KAP_FIT',
      otp,
    );
    if (result) return 'Otp sent successfully to registered email';
    else
      throw new InternalServerErrorException(
        'Internal server occurred while sending mail',
      );
  };

  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
  ): Promise<string> {
    // Step 1: Check if the user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Step 2: Verify the OTP
    const storedOtp = await this.cacheManager.get(
      `forgot_password_otp_${email}`,
    );
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Step 3: Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Step 4: Clear the OTP from Redis
    await this.cacheManager.del(`forgot_password_otp_${email}`);

    return 'Password reset successfully';
  }

  async generateAccessToken(userId: string) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();
    await this.storeSessionInfo(accessToken, userId, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeSessionInfo(
    accessToken: string,
    userId: string,
    refreshToken: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const sessionId = await CryptoUtils.getHash(accessToken, 10);
    const token = new this.refreshTokenModel({
      userId,
      token: refreshToken,
      sessionId,
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });
    token.save();
  }

  async saveLoginHistory(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.last_login = new Date();
    user.save();
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  //   async changePassword(userId: string , changePasswordDto: ChangePasswordDto) {
  //     const {oldPassword , newPassword} = changePasswordDto;
  //     if(oldPassword === newPassword){
  //       throw new BadRequestException("Old password and new password cannot be same");
  //     }
  //     const user = await this.userModel.findById(userId);
  //     if(!user){
  //       throw new UnauthorizedException("Invalid credentials");
  //     }
  //     const isPasswordMatched = await bcrypt.compare(oldPassword , user.password);
  //     if(!isPasswordMatched)saveLoginHistory{
  //       throw new UnauthorizedException("Invalid credentials");
  //     }
  //     const hashedPassword = await bcrypt.hash(newPassword , 10);
  //     user.password = hashedPassword;
  //     user.save();
  //     return "Password changed successfully"
  //   }

  //   async forgotPassword(email: string) {
  //     const user = await this.userModel.findOne({email});
  //     if(!user){
  //       throw new BadRequestException("User not found");
  //     }
  //     const token = uuidv4();
  //     // Send email with token
  //     return {message: "Email sent successfully if the user exists"};
  //   }

  //   findAll(userId: string) {
  //     return `This action returns all auth made by  ${userId}`;
  //   }
}
