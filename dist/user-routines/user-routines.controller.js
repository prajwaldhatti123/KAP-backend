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
exports.RoutineController = void 0;
const common_1 = require("@nestjs/common");
const create_routine_dto_1 = require("./dto/create-routine.dto");
const update_routine_dto_1 = require("./dto/update-routine.dto");
const auth_guard_1 = require("../guards/auth.guard");
const user_routines_service_1 = require("./user-routines.service");
let RoutineController = class RoutineController {
    constructor(routineService) {
        this.routineService = routineService;
    }
    async create(createRoutineDto, request) {
        const userId = request.userId;
        return this.routineService.create(userId, createRoutineDto);
    }
    async findAll(request) {
        const userId = request.userId;
        return this.routineService.findAll(userId);
    }
    async findOne(routine_id, request) {
        const userId = request.userId;
        return this.routineService.findOne(userId, routine_id);
    }
    async update(routine_id, updateRoutineDto, request) {
        const userId = request.userId;
        return this.routineService.update(userId, routine_id, updateRoutineDto);
    }
    async delete(routine_id, request) {
        const userId = request.userId;
        return this.routineService.delete(userId, routine_id);
    }
};
exports.RoutineController = RoutineController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_routine_dto_1.CreateRoutineDto, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('routine/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('routine/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_routine_dto_1.UpdateRoutineDto, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('routine/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "delete", null);
exports.RoutineController = RoutineController = __decorate([
    (0, common_1.Controller)('routines'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [user_routines_service_1.RoutineService])
], RoutineController);
//# sourceMappingURL=user-routines.controller.js.map