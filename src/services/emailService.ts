import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

const emailTemplate = path.join(__dirname, '..', 'templates', 'email.html')
const template = fs.readFileSync(emailTemplate, 'utf-8');

class EmailService {
    constructor() { }

    static async sendForgotPasswordEmail(to: string, code: string) {
        const subject = "Forgot Password";
        const message = `Your email verification code is <b>${code}</b>`;
        return await this.sendMail(to, subject, message);
    }

    private static replaceTemplateConstant(_template: string, key: string, data: string) {
        const regex = new RegExp(key, 'g');
        return _template.replace(regex, data);
    }

    private static async sendMail(to: string, subject: string, message: string) {
        const appName = process.env.APP_NAME as string;
        const supportEmail = process.env.SMTP_USER as string;
        const name = to.split('@')[0];

        let html = this.replaceTemplateConstant(template, '#APP_NAME#', appName);
        html = this.replaceTemplateConstant(html, "#NAME#", name);
        html = this.replaceTemplateConstant(html, '#MESSAGE#', message);
        html = this.replaceTemplateConstant(html, "#SUPPORT_MAIL#", supportEmail);

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        };

        const infoMail = await transport.sendMail(mailOptions);

        return infoMail;
    }
}

export default EmailService