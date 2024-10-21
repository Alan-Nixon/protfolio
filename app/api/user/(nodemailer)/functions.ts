import { IMailOptions, IMailOptionsArgs } from '@/interfaces_types/interfaces_types';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alannixon2520@gmail.com',
        pass: process.env.NEXT_PUBLIC_NODEMAILER_APIKEY,
    },
});

export const sendMail = (Data:IMailOptionsArgs) => {
    const mailOptions: IMailOptions = {
        from: Data.from,
        to: Data.to,
        subject: 'Alan Nixon - From contact message protfolio',
        html: `<h1>Name : ${Data.name}</h1>
        <p>Email: ${Data.from}</p>
        <p>Message: ${Data.message}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}