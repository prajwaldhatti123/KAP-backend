import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({
    description: "The user's email address to send the OTP to",
    example: 'test@example.com',
  })
  @IsEmail()
  @IsString()
  email: string;
}
