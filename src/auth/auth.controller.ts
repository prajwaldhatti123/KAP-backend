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
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import CryptoUtils from 'src/utils/crypto.utils';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    res.status(200).json(result);
  }

  @Post('sendOtp')
  async sendOtp(@Body() SendOtpDto: SendOtpDto, @Res() res: Response) {
    const result = await this.authService.initiateRegistration(
      SendOtpDto.email,
    );
    res.status(200).json({ message: result });
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.create(createUserDto);
    return res.status(201).json({ message: result });
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signout(@Req() req: any, @Res() res: Response) {
    const token = req.headers['authorization'].split(' ')[1];
    const result = await this.authService.logout(req.userId, token);
    return res.status(200).json({ message: result });
  }

  @Post('refreshtoken')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() body: RefreshTokenDto, @Res() res: Response) {
    const result = await this.authService.refreshTokens(body.refreshToken);
    return res.status(200).json(result);
  }

  @Post('forgotPassword')
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() SendOtpDto: SendOtpDto, @Res() res: Response) {
    const result = await this.authService.forgotPasswordOtp(SendOtpDto.email);
    res.status(200).json({ message: result });
  }

  @Post('resetPassword')
  @UsePipes(new ValidationPipe())
  async resetPassword(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.create(createUserDto);
    return res.status(201).json({ message: result });
  }
}
