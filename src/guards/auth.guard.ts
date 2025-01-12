import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import CryptoUtils from 'src/utils/crypto.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  // Make canActivate async to handle asynchronous operations
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Check if the request contains a valid authorization token
    const authHeader: string = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized to access content');
    }

    const token = authHeader.split(' ')[1];

    // Await the result of isValid
    const BlacklistedToken = await this.isBlacklistedToken(token);

    if (BlacklistedToken) {
      throw new UnauthorizedException('Unauthorized to access content');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.userId;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException('Unauthorized to access content');
    }

    return true;
  }

  // isValid method remains the same
  isBlacklistedToken = async (token: string) => {
    if (!token) return null;
    // Check in the Redis store for blacklisted tokens
    const loggedOut = await this.cacheManager.get(`blacklisted_token_${token}`);
    return loggedOut;
  };
}
