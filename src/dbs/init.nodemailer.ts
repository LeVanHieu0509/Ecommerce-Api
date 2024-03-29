import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true,
  auth: {},
});
