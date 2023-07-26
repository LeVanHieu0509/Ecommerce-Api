import { Client, GatewayIntentBits } from "discord.js";

class LoggerService {
    client: Client<any>;
    channelId: string;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })


        this.channelId = process.env.ID_CHANNEL;

        this.client.on('ready', () => {
            console.log(`Logger đang chạy với tên ${this.client.user?.tag}`);
        });

        this.client.login(process.env.TOKEN_DISCORD);

        this.client.on("messageCreate", (msg) => {
            if (msg.author.bot) return;
            if (msg.content === "hello") {
                msg.reply(`Hello! Xin chào nam nha`);
            }
            if (msg.content == "chao con cac") {
                msg.reply("ơ con cạc cái địt cụ mày");
            }
        })
        const channel: any = this.client.channels;

        console.log("channel", channel)
    }

    async sendToMessage(message = 'message') {
        const channel: any = await this.client.channels.cache.get(this.channelId);
        console.log(this.client.channels.cache)
        if (!this.client) {
            console.error('Client chưa được khởi tạo');
            return;
        }
        if (!channel) {
            console.error(`Không thể tìm thấy kênh ${this.channelId}`);
            return;
        }

        return channel.send(message).catch(e => console.log(e))
    }
}

export default LoggerService;