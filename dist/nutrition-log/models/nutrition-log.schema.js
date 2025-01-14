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
exports.NutritionLogSchema = exports.NutritionLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let NutritionLog = class NutritionLog {
};
exports.NutritionLog = NutritionLog;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'UserProfile' }),
    __metadata("design:type", String)
], NutritionLog.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], NutritionLog.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], NutritionLog.prototype, "calories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], NutritionLog.prototype, "protein", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], NutritionLog.prototype, "carbs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], NutritionLog.prototype, "fats", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], NutritionLog.prototype, "meal_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], NutritionLog.prototype, "notes", void 0);
exports.NutritionLog = NutritionLog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NutritionLog);
exports.NutritionLogSchema = mongoose_1.SchemaFactory.createForClass(NutritionLog);
//# sourceMappingURL=nutrition-log.schema.js.map