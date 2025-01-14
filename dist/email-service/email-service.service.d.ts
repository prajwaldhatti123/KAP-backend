import { ConfigService } from '@nestjs/config';
import { TemplateService } from './template-engine/template.service';
export declare class EmailServiceService {
    private configService;
    private templateService;
    private transporter;
    constructor(configService: ConfigService, templateService: TemplateService);
    sendMail(to: string, subject: string, text: string, html?: string): Promise<void>;
    sendOtpMail(to: string, subject: string, text: string, otp?: string): Promise<string>;
    sendForgotOtpMail(username: string, to: string, subject: string, text: string, otp?: string): Promise<string>;
}
