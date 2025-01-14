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
exports.ProgressLogController = void 0;
const common_1 = require("@nestjs/common");
const progress_log_service_1 = require("./progress-log.service");
const create_progress_log_dto_1 = require("./dto/create-progress-log.dto");
const update_progress_log_dto_1 = require("./dto/update-progress-log.dto");
const auth_guard_1 = require("../guards/auth.guard");
let ProgressLogController = class ProgressLogController {
    constructor(progressLogService) {
        this.progressLogService = progressLogService;
    }
    async create(createProgressLogDto, request) {
        const userId = request.userId;
        return this.progressLogService.create(userId, createProgressLogDto);
    }
    async findAll(request) {
        const userId = request.userId;
        return this.progressLogService.findAll(userId);
    }
    async findOne(log_id, request) {
        const userId = request.userId;
        return this.progressLogService.findOne(userId, log_id);
    }
    async update(log_id, updateProgressLogDto, request) {
        const userId = request.userId;
        return this.progressLogService.update(userId, log_id, updateProgressLogDto);
    }
    async delete(log_id, request) {
        const userId = request.userId;
        return this.progressLogService.delete(userId, log_id);
    }
};
exports.ProgressLogController = ProgressLogController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_progress_log_dto_1.CreateProgressLogDto, Object]),
    __metadata("design:returntype", Promise)
], ProgressLogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgressLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProgressLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_progress_log_dto_1.UpdateProgressLogDto, Object]),
    __metadata("design:returntype", Promise)
], ProgressLogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProgressLogController.prototype, "delete", null);
exports.ProgressLogController = ProgressLogController = __decorate([
    (0, common_1.Controller)('progress-logs'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [progress_log_service_1.ProgressLogService])
], ProgressLogController);
//# sourceMappingURL=progress-log.controller.js.map