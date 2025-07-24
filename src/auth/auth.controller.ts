import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SendOtpDto } from './dto/send-otp.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Successful login.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    res.status(200).json(result);
  }

  @Post('sendOtp')
  @ApiOperation({ summary: 'Send OTP for registration' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully.' })
  async sendOtp(@Body() SendOtpDto: SendOtpDto, @Res() res: Response) {
    const result = await this.authService.initiateRegistration(
      SendOtpDto.email,
    );
    res.status(200).json({ message: result });
  }

  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.create(createUserDto);
    return res.status(201).json({ message: result });
  }

  @Post('signout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Successful logout.' })
  @UseGuards(AuthGuard)
  async signout(@Req() req: any, @Res() res: Response) {
    const token = req.headers['authorization'].split(' ')[1];
    const result = await this.authService.logout(req.userId, token);
    return res.status(200).json({ message: result });
  }

  @Post('refreshtoken')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully.' })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() body: RefreshTokenDto, @Res() res: Response) {
    const result = await this.authService.refreshTokens(body.refreshToken);
    return res.status(200).json(result);
  }

  @Post('forgotPassword')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully.' })
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() SendOtpDto: SendOtpDto, @Res() res: Response) {
    const result = await this.authService.forgotPasswordOtp(SendOtpDto.email);
    res.status(200).json({ message: result });
  }

  @Post('resetPassword')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe())
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.otp,
      resetPasswordDto.password,
    );
    return res.status(200).json({ message: result });
  }
}
