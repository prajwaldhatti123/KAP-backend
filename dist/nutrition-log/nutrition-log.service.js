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
exports.NutritionLogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nutrition_log_schema_1 = require("./models/nutrition-log.schema");
let NutritionLogService = class NutritionLogService {
    constructor(nutritionLogModel) {
        this.nutritionLogModel = nutritionLogModel;
    }
    async create(user_id, createNutritionLogDto) {
        const nutritionLog = new this.nutritionLogModel({
            user_id,
            ...createNutritionLogDto,
        });
        return nutritionLog.save();
    }
    async findAll(user_id) {
        return this.nutritionLogModel.find({ user_id }).exec();
    }
    async findOne(user_id, log_id) {
        return this.nutritionLogModel.findOne({ user_id, _id: log_id }).exec();
    }
    async update(user_id, log_id, updateNutritionLogDto) {
        return this.nutritionLogModel.findOneAndUpdate({ user_id, _id: log_id }, { $set: updateNutritionLogDto }, { new: true });
    }
    async delete(user_id, log_id) {
        return this.nutritionLogModel
            .findOneAndDelete({ user_id, _id: log_id })
            .exec();
    }
};
exports.NutritionLogService = NutritionLogService;
exports.NutritionLogService = NutritionLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nutrition_log_schema_1.NutritionLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NutritionLogService);
//# sourceMappingURL=nutrition-log.service.js.map