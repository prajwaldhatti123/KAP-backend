"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const key_config_1 = require("./config/key.config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const email_service_module_1 = require("./email-service/email-service.module");
const user_goal_module_1 = require("./user-goal/user-goal.module");
const user_routines_module_1 = require("./user-routines/user-routines.module");
const workout_sessions_module_1 = require("./workout-sessions/workout-sessions.module");
const progress_log_module_1 = require("./progress-log/progress-log.module");
const nutrition_log_module_1 = require("./nutrition-log/nutrition-log.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [key_config_1.default],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (keyConfig) => ({
                    secret: keyConfig.get('jwt.secret'),
                    signOptions: { expiresIn: keyConfig.get('jwt.expiresIn') },
                }),
                global: true,
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (keyConfig) => ({
                    uri: keyConfig.get('database.uri'),
                }),
                inject: [config_1.ConfigService],
            }),
            cache_manager_1.CacheModule.registerAsync({
                useFactory: async (keyConfig) => {
                    const store = await (0, cache_manager_redis_yet_1.redisStore)({
                        username: keyConfig.get('redis.username'),
                        password: keyConfig.get('redis.password'),
                        socket: {
                            host: keyConfig.get('redis.host'),
                            port: keyConfig.get('redis.port'),
                        },
                    });
                    return {
                        store: store,
                        ttl: 3 * 60000,
                    };
                },
                isGlobal: true,
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            email_service_module_1.EmailServiceModule,
            user_goal_module_1.UserGoalModule,
            user_routines_module_1.UserRoutinesModule,
            workout_sessions_module_1.WorkoutSessionsModule,
            progress_log_module_1.ProgressLogModule,
            nutrition_log_module_1.NutritionLogModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map