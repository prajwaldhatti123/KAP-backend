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
exports.WorkoutSessionController = void 0;
const common_1 = require("@nestjs/common");
const create_workout_session_dto_1 = require("./dto/create-workout-session.dto");
const update_workout_session_dto_1 = require("./dto/update-workout-session.dto");
const workout_sessions_service_1 = require("./workout-sessions.service");
const auth_guard_1 = require("../guards/auth.guard");
let WorkoutSessionController = class WorkoutSessionController {
    constructor(workoutSessionService) {
        this.workoutSessionService = workoutSessionService;
    }
    async create(createWorkoutSessionDto, request) {
        const userId = request.userId;
        return this.workoutSessionService.create(userId, createWorkoutSessionDto);
    }
    async findAll(request) {
        const userId = request.userId;
        return this.workoutSessionService.findAll(userId);
    }
    async findOne(session_id, request) {
        const userId = request.userId;
        return this.workoutSessionService.findOne(userId, session_id);
    }
    async update(session_id, updateWorkoutSessionDto, request) {
        const userId = request.userId;
        return this.workoutSessionService.update(userId, session_id, updateWorkoutSessionDto);
    }
    async delete(session_id, request) {
        const userId = request.userId;
        return this.workoutSessionService.delete(userId, session_id);
    }
};
exports.WorkoutSessionController = WorkoutSessionController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workout_session_dto_1.CreateWorkoutSessionDto, Object]),
    __metadata("design:returntype", Promise)
], WorkoutSessionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkoutSessionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkoutSessionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workout_session_dto_1.UpdateWorkoutSessionDto, Object]),
    __metadata("design:returntype", Promise)
], WorkoutSessionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkoutSessionController.prototype, "delete", null);
exports.WorkoutSessionController = WorkoutSessionController = __decorate([
    (0, common_1.Controller)('workout-sessions'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [workout_sessions_service_1.WorkoutSessionService])
], WorkoutSessionController);
//# sourceMappingURL=workout-sessions.controller.js.map