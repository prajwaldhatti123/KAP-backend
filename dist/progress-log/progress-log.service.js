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
exports.ProgressLogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const progress_log_schema_1 = require("./models/progress-log.schema");
let ProgressLogService = class ProgressLogService {
    constructor(progressLogModel) {
        this.progressLogModel = progressLogModel;
    }
    async create(user_id, createProgressLogDto) {
        const progressLog = new this.progressLogModel({
            user_id,
            ...createProgressLogDto,
        });
        return progressLog.save();
    }
    async findAll(user_id) {
        return this.progressLogModel.find({ user_id }).exec();
    }
    async findOne(user_id, log_id) {
        return this.progressLogModel.findOne({ user_id, _id: log_id }).exec();
    }
    async update(user_id, log_id, updateProgressLogDto) {
        return this.progressLogModel.findOneAndUpdate({ user_id, _id: log_id }, { $set: updateProgressLogDto }, { new: true });
    }
    async delete(user_id, log_id) {
        return this.progressLogModel
            .findOneAndDelete({ user_id, _id: log_id })
            .exec();
    }
};
exports.ProgressLogService = ProgressLogService;
exports.ProgressLogService = ProgressLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(progress_log_schema_1.ProgressLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProgressLogService);
//# sourceMappingURL=progress-log.service.js.map