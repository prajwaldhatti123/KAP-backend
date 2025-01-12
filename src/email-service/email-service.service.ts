import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmailServiceDto } from './dto/create-email-service.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { TemplateService } from './template-engine/template.service';

@Injectable()
export class EmailServiceService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private templateService: TemplateService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.password'),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('email.from'),
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendOtpMail(
    to: string,
    subject: string,
    text: string,
    otp?: string,
  ): Promise<string> {
    const templatePath = `${__dirname}/../../public/templates/dummy-email-otp.template.hbs`;
    const html = await this.templateService.compileTemplate(templatePath, {
      appName: 'KAP-FIT',
      otp: otp,
      userName: 'User',
      year: new Date().getFullYear(),
    });
    const mailOptions = {
      from: this.configService.get<string>('email.from'),
      to,
      subject,
      text,
      html,
    };

    try {
      // await this.transporter.sendMail(mailOptions);
      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }

  async sendForgotOtpMail(
    username: string = 'user',
    to: string,
    subject: string,
    text: string,
    otp?: string,
  ): Promise<string> {
    const templatePath = `${__dirname}/../../public/templates/forgot-password-email-otp.template.hbs`;
    const html = await this.templateService.compileTemplate(templatePath, {
      appName: 'KAP-FIT',
      otp: otp,
      userName: username,
      year: new Date().getFullYear(),
    });
    const mailOptions = {
      from: this.configService.get<string>('email.from'),
      to,
      subject,
      text,
      html,
    };

    try {
      // await this.transporter.sendMail(mailOptions);
      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }
}
