import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './models/user.model';
import { RefreshTokenSchema } from './models/refresh-token.model';
import { EmailServiceModule } from 'src/email-service/email-service.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserProfile', schema: UserProfileSchema },
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    EmailServiceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
