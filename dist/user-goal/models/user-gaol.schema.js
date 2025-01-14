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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGoalSchema = exports.UserGoal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let UserGoal = class UserGoal {
};
exports.UserGoal = UserGoal;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'UserProfile' }),
    __metadata("design:type", String)
], UserGoal.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['bulking', 'cutting', 'maintenance'] }),
    __metadata("design:type", String)
], UserGoal.prototype, "goal_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], UserGoal.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], UserGoal.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserGoal.prototype, "notes", void 0);
exports.UserGoal = UserGoal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserGoal);
exports.UserGoalSchema = mongoose_1.SchemaFactory.createForClass(UserGoal);
//# sourceMappingURL=user-gaol.schema.js.map