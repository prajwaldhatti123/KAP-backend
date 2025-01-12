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
exports.UserProfileSchema = exports.UserProfile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const auth_validator_functions_1 = require("../validators/auth.validator.functions");
let UserProfile = class UserProfile {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        validate: {
            validator: auth_validator_functions_1.validateEmail,
            message: 'Invalid email address format',
        },
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        validate: {
            validator: auth_validator_functions_1.validatePhoneNumber,
            message: 'Phone number must be 10-15 digits',
        },
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "phone_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserProfile.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['male', 'female', 'other'],
        required: false,
        default: null,
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        validate: {
            validator: auth_validator_functions_1.validateBirthday,
            message: 'Birthday must be in YYYY-MM-DD format',
        },
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], UserProfile.prototype, "profile_pic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], UserProfile.prototype, "last_login", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Object,
        default: {},
    }),
    __metadata("design:type", Object)
], UserProfile.prototype, "preferences", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            timestamp: { type: Date, default: Date.now },
            ip: {
                type: String,
                validate: {
                    validator: auth_validator_functions_1.validateIpAddress,
                    message: 'Invalid IP address format',
                },
            },
        },
    ]),
    __metadata("design:type", Array)
], UserProfile.prototype, "login_history", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['active', 'suspended', 'deleted'],
        default: 'active',
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "status", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserProfile);
exports.UserProfileSchema = mongoose_1.SchemaFactory.createForClass(UserProfile);
//# sourceMappingURL=user.model.js.map