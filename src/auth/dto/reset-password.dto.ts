import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'User email address' })
  @IsString()
  email: string;

  @ApiProperty({ description: '6-digit OTP for password reset' })
  @IsString()
  @Length(6)
  otp: string;

  @ApiProperty({
    description:
      'New user password. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character. Minimum length of 6 characters.',
    example: 'NewPassword123!',
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
}
