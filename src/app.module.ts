import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import keyConfig from './config/key.config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { EmailServiceModule } from './email-service/email-service.module';
import { UserGoalModule } from './user-goal/user-goal.module';
import { UserRoutinesModule } from './user-routines/user-routines.module';
import { WorkoutSessionsModule } from './workout-sessions/workout-sessions.module';
import { ProgressLogModule } from './progress-log/progress-log.module';
import { NutritionLogModule } from './nutrition-log/nutrition-log.module';
import { WorkoutAnalyticsModule } from './workout-analytics/workout-analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [keyConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (keyConfig) => ({
        secret: keyConfig.get('jwt.secret'),
        signOptions: { expiresIn: keyConfig.get('jwt.expiresIn') },
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (keyConfig) => ({
        uri: keyConfig.get('database.uri'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: async (keyConfig) => {
        const store = await redisStore({
          username: keyConfig.get('redis.username'),
          password: keyConfig.get('redis.password'),
          socket: {
            host: keyConfig.get('redis.host'),
            port: keyConfig.get('redis.port'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000,
        };
      },
      isGlobal: true,
      inject: [ConfigService],
    }),
    AuthModule,
    EmailServiceModule,
    UserGoalModule,
    UserRoutinesModule,
    WorkoutSessionsModule,
    ProgressLogModule,
    NutritionLogModule,
    WorkoutAnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
