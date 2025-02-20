import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const config = () => {
  return {
    host: process.env.NODEMAILER_HOST,
    port: +process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAIlER_PASS,
    },
  };
};

export const transporter = nodemailer.createTransport(config());
