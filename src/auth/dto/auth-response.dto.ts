import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '../models/user.model';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'JWT refresh token' })
  refresh_token: string;

  @ApiProperty({ type: () => UserProfile })
  user: UserProfile;
}
