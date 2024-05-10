import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "levanhieu.workspace@gmail.com",
    pass: "xznvcyhlnfxxikwz",
  },
});
