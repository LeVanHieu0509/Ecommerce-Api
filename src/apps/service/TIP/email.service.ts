import { NotFoundError } from "../../../core/error.response";
import { transport } from "../../../dbs/init.nodemailer";
import { replacePlaceHolder } from "../../../ultis";
import { newOtp } from "./otp.service";
import { getTemplate } from "./template.service";

const sendEmailLinkVerify = async ({ html, toEmail, subject = "Xác nhận Email đăng ký!", text = "Xác nhận ..." }) => {
  try {
    const mailOptions = {
      from: '"SHOP DEV <levanhieu.hex@gmail.com>',
      to: toEmail,
      subject,
      text,
      html,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent::", info.messageId);
    });
  } catch (error) {
    console.log(`error with email`, error);
  }
};

const sendEmailToken = async ({ email = null }) => {
  try {
    //1. get token
    const token = await newOtp({ email });

    //2. get Template
    const template = await getTemplate({
      tem_name: "HTML EMAIL TOKEN",
    });

    if (!template) {
      throw new NotFoundError("Template not found");
    }
    //3. replace placeholder with params

    const content = replacePlaceHolder(template.tem_html, {
      link_verify: `https://localhost:3001/cgp/welcom-back?token=${token.otp_token}`,
    });

    //4. send email (AWS tiến hành sắp xếp phà kiểm duyệt send email)
    sendEmailLinkVerify({
      html: content,
      toEmail: email,
      subject: "Vui lòng xác nhận địa chỉ Email đăng ký SHOPDEV.com",
    });
  } catch (error) {}
};

export { sendEmailToken };
