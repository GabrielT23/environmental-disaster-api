import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Config } from '../config/configuration';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<Config['gmailUser']>('gmailUser'), // Variável de ambiente com o endereço do Gmail
        pass: this.configService.get<Config['gmailPassword']>('gmailPassword'), // Variável de ambiente com a senha do Gmail
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: this.configService.get<Config['gmailUser']>('gmailUser'),
        to,
        subject,
        text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
