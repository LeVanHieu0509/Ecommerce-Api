const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on("ready", () => {
    console.log(`Logger is as ${client.user.tag}`);
})
const token = "MTEzMzY1Mzk3Mjc4ODQ1NzU4NA.GfFRRQ.wcGtb1azmPwzxbQeIWdVve2B_0sGCijRbyeimQ"
client.login(token);

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;
    if (msg.content === "hello") {
        msg.reply(`Hello! Xin chào nam nha`);
    }
    if (msg.content == "chao con cac") {
        msg.reply("ơ con cạc cái địt cụ mày");
    }
})

console.log(client)

