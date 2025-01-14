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
exports.WorkoutSessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workout_session_schema_1 = require("./models/workout-session.schema");
let WorkoutSessionService = class WorkoutSessionService {
    constructor(workoutSessionModel) {
        this.workoutSessionModel = workoutSessionModel;
    }
    async create(user_id, createWorkoutSessionDto) {
        const workoutSession = new this.workoutSessionModel({
            user_id,
            ...createWorkoutSessionDto,
        });
        return workoutSession.save();
    }
    async findAll(user_id) {
        return this.workoutSessionModel.find({ user_id }).exec();
    }
    async findOne(user_id, session_id) {
        return this.workoutSessionModel
            .findOne({ user_id, _id: session_id })
            .exec();
    }
    async update(user_id, session_id, updateWorkoutSessionDto) {
        return this.workoutSessionModel.findOneAndUpdate({ user_id, _id: session_id }, { $set: updateWorkoutSessionDto }, { new: true });
    }
    async delete(user_id, session_id) {
        return this.workoutSessionModel
            .findOneAndDelete({ user_id, _id: session_id })
            .exec();
    }
};
exports.WorkoutSessionService = WorkoutSessionService;
exports.WorkoutSessionService = WorkoutSessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workout_session_schema_1.WorkoutSession.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkoutSessionService);
//# sourceMappingURL=workout-sessions.service.js.map