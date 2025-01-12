import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { CreateEmailServiceDto } from './dto/create-email-service.dto';
import { TemplateService } from './template-engine/template.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('email-service')
// @UseGuards(AuthGuard)
export class EmailServiceController {
  constructor(
    private readonly emailServiceService: EmailServiceService,
    private readonly templateService: TemplateService,
  ) {}

  // @Post('sendMail')
  // sendMail(@Body() createEmailServiceDto: CreateEmailServiceDto) {
  //   return this.emailServiceService.sendMail(
  //     createEmailServiceDto.to,
  //     'Test Email from NestJS',
  //     'This is a test email sent from NestJS using Gmail.',
  //     '<p>This is a test email sent from <b>NestJS</b> using Gmail.</p>',
  //   );
  // }

  // @Post('sendOtpMail')
  // @UsePipes(new ValidationPipe())
  // async sendOtpMail(
  //   @Body() createEmailServiceDto: CreateEmailServiceDto,
  //   @Res() res: Response,
  // ) {
  //   const templatePath = `${__dirname}/../../public/templates/dummy-email-otp.template.hbs`;
  //   // this below template path will only work when handlebar files are present in dist file
  //   // const templatePath = `${__dirname}/templates/dummy-email-otp.template.hbs`;
  //   const html = await this.templateService.compileTemplate(templatePath, {
  //     appName: 'KAP-FIT',
  //     otp: '923684',
  //     userName: 'Prajwal Dhatti',
  //     year: new Date().getFullYear(),
  //   });
  //   const result = await this.emailServiceService.sendOtpMail(
  //     createEmailServiceDto.to,
  //     'Account Verification',
  //     'Please use the below OTP valid for only 10 minutes to login into KAP_FIT and verify yourself',
  //     html,
  //   );
  //   res.status(200).send(result);
  // }
}
