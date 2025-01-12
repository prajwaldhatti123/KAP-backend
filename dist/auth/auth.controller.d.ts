import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SendOtpDto } from './dto/send-otp.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<void>;
    sendOtp(SendOtpDto: SendOtpDto, res: Response): Promise<void>;
    create(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signout(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(body: RefreshTokenDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
