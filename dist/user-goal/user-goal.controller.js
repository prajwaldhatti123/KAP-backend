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
exports.UserGoalController = void 0;
const common_1 = require("@nestjs/common");
const user_goal_service_1 = require("./user-goal.service");
const create_goal_dto_1 = require("./dto/create-goal.dto");
const auth_guard_1 = require("../guards/auth.guard");
let UserGoalController = class UserGoalController {
    constructor(userGoalService) {
        this.userGoalService = userGoalService;
    }
    async create(createGoalDto, req) {
        return this.userGoalService.create(req.userId, createGoalDto);
    }
    async findAll(req) {
        return this.userGoalService.findAll(req.userId);
    }
    async delete(goal_id, req) {
        return this.userGoalService.delete(req.userId, goal_id);
    }
};
exports.UserGoalController = UserGoalController;
__decorate([
    (0, common_1.Post)('setGoal'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_goal_dto_1.CreateGoalDto, Object]),
    __metadata("design:returntype", Promise)
], UserGoalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getGoal'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserGoalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('deleteGoal/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserGoalController.prototype, "delete", null);
exports.UserGoalController = UserGoalController = __decorate([
    (0, common_1.Controller)('goals'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [user_goal_service_1.UserGoalService])
], UserGoalController);
//# sourceMappingURL=user-goal.controller.js.map