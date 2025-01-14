"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSessionsModule = void 0;
const common_1 = require("@nestjs/common");
const workout_sessions_controller_1 = require("./workout-sessions.controller");
const workout_sessions_service_1 = require("./workout-sessions.service");
const mongoose_1 = require("@nestjs/mongoose");
const workout_session_schema_1 = require("./models/workout-session.schema");
let WorkoutSessionsModule = class WorkoutSessionsModule {
};
exports.WorkoutSessionsModule = WorkoutSessionsModule;
exports.WorkoutSessionsModule = WorkoutSessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'WorkoutSession', schema: workout_session_schema_1.WorkoutSessionSchema },
            ]),
        ],
        controllers: [workout_sessions_controller_1.WorkoutSessionController],
        providers: [workout_sessions_service_1.WorkoutSessionService],
    })
], WorkoutSessionsModule);
//# sourceMappingURL=workout-sessions.module.js.map