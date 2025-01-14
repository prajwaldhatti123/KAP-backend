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
exports.EmailServiceService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const template_service_1 = require("./template-engine/template.service");
let EmailServiceService = class EmailServiceService {
    constructor(configService, templateService) {
        this.configService = configService;
        this.templateService = templateService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('email.host'),
            port: this.configService.get('email.port'),
            secure: false,
            auth: {
                user: this.configService.get('email.user'),
                pass: this.configService.get('email.password'),
            },
        });
    }
    async sendMail(to, subject, text, html) {
        const mailOptions = {
            from: this.configService.get('email.from'),
            to,
            subject,
            text,
            html,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
    async sendOtpMail(to, subject, text, otp) {
        const templatePath = `${__dirname}/../../public/templates/dummy-email-otp.template.hbs`;
        const html = await this.templateService.compileTemplate(templatePath, {
            appName: 'KAP-FIT',
            otp: otp,
            userName: 'User',
            year: new Date().getFullYear(),
        });
        const mailOptions = {
            from: this.configService.get('email.from'),
            to,
            subject,
            text,
            html,
        };
        try {
            return this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending OTP email:', error);
            throw new common_1.InternalServerErrorException('Failed to send OTP email');
        }
    }
    async sendForgotOtpMail(username = 'user', to, subject, text, otp) {
        const templatePath = `${__dirname}/../../public/templates/forgot-password-email-otp.template.hbs`;
        const html = await this.templateService.compileTemplate(templatePath, {
            appName: 'KAP-FIT',
            otp: otp,
            userName: username,
            year: new Date().getFullYear(),
        });
        const mailOptions = {
            from: this.configService.get('email.from'),
            to,
            subject,
            text,
            html,
        };
        try {
            return this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending OTP email:', error);
            throw new common_1.InternalServerErrorException('Failed to send OTP email');
        }
    }
};
exports.EmailServiceService = EmailServiceService;
exports.EmailServiceService = EmailServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        template_service_1.TemplateService])
], EmailServiceService);
//# sourceMappingURL=email-service.service.js.map