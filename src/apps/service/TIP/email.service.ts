import { NotFoundError } from "../../../core/error.response";
import { transport } from "../../../dbs/init.nodemailer";
import { replacePlaceHolder } from "../../../ultis";
import { newOtp } from "./otp.service";
import { getTemplate } from "./template.service";

const sendEmailLinkVerify = async ({ html, toEmail, subject = "Xác nhận Email đăng ký!", text = "Xác nhận ..." }) => {
  try {
    const mailOptions = {
      from: "BITBACK <levanhieu.workspace@gmail.com>",
      to: toEmail,
      subject,
      text: "",
      html,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }

      return console.log("Message %s sent: %s", info.messageId, info.response);
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
      tem_name: "HTML EMAIL TOKEN NEW 1",
    });

    if (!template) {
      throw new NotFoundError("Template not found");
    }
    //3. replace placeholder with params

    const content = replacePlaceHolder(template.tem_html, {
      link_verify: `http://localhost:3000/cgp/welcom-back?token=${token.otp_token}`,
    });

    //4. send email (AWS tiến hành sắp xếp phà kiểm duyệt send email)
    await sendEmailLinkVerify({
      html: content,
      toEmail: email,
      subject: "Vui lòng xác nhận địa chỉ Email đăng ký SHOPDEV.com",
    });
  } catch (error) {}
};

export { sendEmailToken };
