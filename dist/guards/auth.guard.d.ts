import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private cacheManager;
    private jwtService;
    constructor(cacheManager: Cache, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    isBlacklistedToken: (token: string) => Promise<unknown>;
}
