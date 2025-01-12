"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(cacheManager, jwtService) {
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
        this.isBlacklistedToken = async (token) => {
            if (!token)
                return null;
            const loggedOut = await this.cacheManager.get(`blacklisted_token_${token}`);
            return loggedOut;
        };
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Unauthorized to access content');
        }
        const token = authHeader.split(' ')[1];
        const BlacklistedToken = await this.isBlacklistedToken(token);
        if (BlacklistedToken) {
            throw new common_1.UnauthorizedException('Unauthorized to access content');
        }
        try {
            const payload = this.jwtService.verify(token);
            request.userId = payload.userId;
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.UnauthorizedException('Unauthorized to access content');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map