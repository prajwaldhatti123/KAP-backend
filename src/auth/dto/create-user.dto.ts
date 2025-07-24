import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'User password. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Minimum length of 6 characters.',
    example: 'Password123!',
  })
  @IsString()
  @MinLength(6)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and should be of at least 6 characters',
    },
  )
  password: string;

  @ApiProperty({ description: '6-digit OTP for email verification' })
  @IsString()
  @Length(6)
  otp: string;
}
