import { IMailOptions, IMailOptionsArgs } from '@/interfaces_types/interfaces_types';
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alannixon2520@gmail.com',
        pass: process.env.NEXT_PUBLIC_NODEMAILER_APIKEY,
    },
});

export const sendMail = (Data: IMailOptionsArgs) => {
    const emailPath = path.join(__dirname, '../../../../../../public/email.html')
    const emailTemplate = fs.readFileSync(emailPath, "utf-8");
    const html = emailTemplate.replace("{{message}}", Data.message)
        console.log(html)
    const mailOptions: IMailOptions = {
        from: Data.from,
        to: Data.to,
        subject: 'Alan Nixon - From contact message portfolio',
        html
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
