import { IsEmail, IsString } from 'class-validator';

export class SendOtpDto {
  @IsEmail()
  @IsString()
  email: string;
}
