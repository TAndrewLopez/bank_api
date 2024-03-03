import nodemailer from "nodemailer";

class EmailService {
    constructor() { }

    static async sendForgotPasswordEmail(to: string, code: string) {
        const subject = "Forgot Password";
        const message = `Your email verification code is ${code}`;
        return await this.sendMail(to, subject, message);
    }

    private static async sendMail(to: string, subject: string, message: string) {
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
            text: message,
            html: message,
        };

        const infoMail = await transport.sendMail(mailOptions);

        return infoMail;
    }
}

export default EmailService