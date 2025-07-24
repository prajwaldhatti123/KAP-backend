import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token received during login',
    example: 'your-refresh-token',
  })
  @IsString()
  refreshToken: string;
}
