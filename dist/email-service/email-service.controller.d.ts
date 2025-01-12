import { EmailServiceService } from './email-service.service';
import { TemplateService } from './template-engine/template.service';
export declare class EmailServiceController {
    private readonly emailServiceService;
    private readonly templateService;
    constructor(emailServiceService: EmailServiceService, templateService: TemplateService);
}
