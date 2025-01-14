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
exports.WorkoutSessionSchema = exports.WorkoutSession = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let WorkoutSession = class WorkoutSession {
};
exports.WorkoutSession = WorkoutSession;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'UserProfile' }),
    __metadata("design:type", String)
], WorkoutSession.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'Routine' }),
    __metadata("design:type", String)
], WorkoutSession.prototype, "routine_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], WorkoutSession.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            exercise_id: { type: String, required: true, ref: 'Exercise' },
            exercise_name: { type: String, required: true },
            exercise_category: { type: String, required: true },
            body_part: { type: String, required: true },
            main_sets: {
                type: [
                    {
                        set: { type: Number, required: true },
                        weight_metric: {
                            type: String,
                            required: true,
                            enum: ['kg', 'lbs'],
                        },
                        inst_type: { type: String, required: false },
                        weight_value: { type: Number, required: true },
                        reps: { type: Number, required: true },
                        notes: { type: String, required: false },
                    },
                ],
                default: [],
            },
            warmup_sets: {
                type: [
                    {
                        set: { type: Number, required: true },
                        weight_metric: {
                            type: String,
                            required: true,
                            enum: ['kg', 'lbs'],
                        },
                        inst_type: { type: String, required: false },
                        weight_value: { type: Number, required: true },
                        reps: { type: Number, required: true },
                        notes: { type: String, required: false },
                    },
                ],
                default: [],
            },
        },
    ]),
    __metadata("design:type", Array)
], WorkoutSession.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", Number)
], WorkoutSession.prototype, "duration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], WorkoutSession.prototype, "notes", void 0);
exports.WorkoutSession = WorkoutSession = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WorkoutSession);
exports.WorkoutSessionSchema = mongoose_1.SchemaFactory.createForClass(WorkoutSession);
//# sourceMappingURL=workout-session.schema.js.map