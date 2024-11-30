import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule {
    controllers: [AuthController]
}
