import nodemailer from 'nodemailer';

import { MAILER_USER, mail_options } from './config';

const transporter = nodemailer.createTransport(mail_options);

export default transporter;

export interface EmailInput {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailInput) => {
  await transporter.sendMail({
    from: MAILER_USER,
    subject,
    to,
    html,
  });
};

export const verificationEmail = async (
  token: string,
  email: string,
  origin: string,
  name: string
) => {
  const queryLink = `${origin}/api/v1/auth/verify-email?token=${token}&email=${email}`;

  const html = `
    <h4>Hello ${name}</h4>
    <p>Please click link and verify email : <a href="${queryLink}" target="_blank">verify email</a></p>
    `;

  await sendEmail({
    subject: 'Verify your email',
    to: email,
    html,
  });
};
