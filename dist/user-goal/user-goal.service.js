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
exports.UserGoalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_gaol_schema_1 = require("./models/user-gaol.schema");
const mongoose_2 = require("mongoose");
let UserGoalService = class UserGoalService {
    constructor(userGoalModel) {
        this.userGoalModel = userGoalModel;
    }
    async create(user_id, createGoalDto) {
        const goal = new this.userGoalModel({ user_id, ...createGoalDto });
        return goal.save();
    }
    async findAll(user_id) {
        return this.userGoalModel.find({ user_id }).exec();
    }
    async delete(user_id, goal_id) {
        return this.userGoalModel
            .findOneAndDelete({ user_id, _id: goal_id })
            .exec();
    }
};
exports.UserGoalService = UserGoalService;
exports.UserGoalService = UserGoalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_gaol_schema_1.UserGoal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserGoalService);
//# sourceMappingURL=user-goal.service.js.map