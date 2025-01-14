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
exports.RoutineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_routine_schema_1 = require("./models/user-routine.schema");
let RoutineService = class RoutineService {
    constructor(routineModel) {
        this.routineModel = routineModel;
    }
    async create(user_id, createRoutineDto) {
        const routine = new this.routineModel({ user_id, ...createRoutineDto });
        return routine.save();
    }
    async findAll(user_id) {
        return this.routineModel.find({ user_id }).exec();
    }
    async findOne(user_id, routine_id) {
        return this.routineModel.findOne({ user_id, _id: routine_id }).exec();
    }
    async update(user_id, routine_id, updateRoutineDto) {
        return this.routineModel.findOneAndUpdate({ user_id, _id: routine_id }, { $set: updateRoutineDto }, { new: true });
    }
    async delete(user_id, routine_id) {
        return this.routineModel
            .findOneAndDelete({ user_id, _id: routine_id })
            .exec();
    }
};
exports.RoutineService = RoutineService;
exports.RoutineService = RoutineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_routine_schema_1.Routine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoutineService);
//# sourceMappingURL=user-routines.service.js.map