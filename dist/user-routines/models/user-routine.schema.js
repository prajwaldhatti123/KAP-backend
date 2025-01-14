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
exports.RoutineSchema = exports.Routine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Routine = class Routine {
};
exports.Routine = Routine;
__decorate([
    (0, mongoose_1.Prop)({ required: true, ref: 'UserProfile' }),
    __metadata("design:type", String)
], Routine.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Routine.prototype, "routine_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Routine.prototype, "routine_desc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Routine.prototype, "routine_timer", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            exercise_id: { type: String, required: true, ref: 'Exercise' },
            exercise_name: { type: String, required: true },
            exercise_category: { type: String, required: true },
            body_part: { type: String, required: true },
            exercise_main_details: [
                {
                    set: { type: Number, required: true },
                    weight_metric: { type: String, required: true, enum: ['kg', 'lbs'] },
                    inst_type: { type: String, required: false },
                    weight_value: { type: Number, required: true },
                    reps: { type: Number, required: true },
                    timer: { type: Number, required: false },
                },
            ],
            exercise_warmup_details: {
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
                        timer: { type: Number, required: false },
                    },
                ],
                required: false,
            },
        },
    ]),
    __metadata("design:type", Array)
], Routine.prototype, "routine_exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Routine.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Routine.prototype, "tags", void 0);
exports.Routine = Routine = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Routine);
exports.RoutineSchema = mongoose_1.SchemaFactory.createForClass(Routine);
//# sourceMappingURL=user-routine.schema.js.map