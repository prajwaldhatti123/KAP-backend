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
exports.NutritionLogController = void 0;
const common_1 = require("@nestjs/common");
const nutrition_log_service_1 = require("./nutrition-log.service");
const create_nutrition_log_dto_1 = require("./dto/create-nutrition-log.dto");
const update_nutrition_log_dto_copy_1 = require("./dto/update-nutrition-log.dto copy");
const auth_guard_1 = require("../guards/auth.guard");
let NutritionLogController = class NutritionLogController {
    constructor(nutritionLogService) {
        this.nutritionLogService = nutritionLogService;
    }
    async create(createNutritionLogDto, request) {
        const userId = request.userId;
        return this.nutritionLogService.create(userId, createNutritionLogDto);
    }
    async findAll(request) {
        const userId = request.userId;
        return this.nutritionLogService.findAll(userId);
    }
    async findOne(log_id, request) {
        const userId = request.userId;
        return this.nutritionLogService.findOne(userId, log_id);
    }
    async update(log_id, updateNutritionLogDto, request) {
        const userId = request.userId;
        return this.nutritionLogService.update(userId, log_id, updateNutritionLogDto);
    }
    async delete(log_id, request) {
        const userId = request.userId;
        return this.nutritionLogService.delete(userId, log_id);
    }
};
exports.NutritionLogController = NutritionLogController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nutrition_log_dto_1.CreateNutritionLogDto, Object]),
    __metadata("design:returntype", Promise)
], NutritionLogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NutritionLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NutritionLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nutrition_log_dto_copy_1.UpdateNutritionLogDto, Object]),
    __metadata("design:returntype", Promise)
], NutritionLogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NutritionLogController.prototype, "delete", null);
exports.NutritionLogController = NutritionLogController = __decorate([
    (0, common_1.Controller)('nutrition-logs'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [nutrition_log_service_1.NutritionLogService])
], NutritionLogController);
//# sourceMappingURL=nutrition-log.controller.js.map