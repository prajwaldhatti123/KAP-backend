import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

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

  @IsString()
  @Length(6)
  otp: string;
}
