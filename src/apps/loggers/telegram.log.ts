const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv").config();

const TOKEN = process.env.TELE_BOT_TOKEN;
const TELE_BOT_GROUP_ID = process.env.TELE_BOT_GROUP_ID;

const botTele = new TelegramBot(TOKEN, { polling: true });

export async function configBot() {
  botTele.onText(/\/start/, (msg) => {
    console.log(msg.chat.id);
    botTele.sendMessage(msg.chat.id, "💲Welcome💲");
  });

  botTele.onText(/\/hieu/, (msg) => {
    botTele.sendMessage(msg.chat.id, `Anh HIẾU đẹp trai vcl ☠️☠️ @daddycool1002`);
  });
}

export function botNotiRequest(msg) {
  botTele
    .sendMessage(TELE_BOT_GROUP_ID, msg, { parse_mode: "HTML", disable_web_page_preview: true })
    .then(() => {
      console.log("you have new request");
    })
    .catch((error) => {
      console.log("fail to send tele", error);
    });
}
