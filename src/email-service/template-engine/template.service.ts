// src/template/template.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  async compileTemplate(templatePath: string, data: any): Promise<string> {
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    return template(data);
  }
}