import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFETIME = process.env.JWT_LIFETIME;

export const PORT: number = Number(process.env.PORT) | 5000;
export const MAILER_USER = process.env.MAILER_USER;
export const MAILER_PASS = process.env.MAILER_PASS;
export const mail_options = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
};
