import { Client, GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Routes } from "discord.js";
import { REST } from '@discordjs/rest';

class LoggerService {

    static instance: any;
    client: Client<any>;
    channelId: string;

    constructor() {
        this.connect();
        this.messageCommand()
    }

    async connect() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })
        this.channelId = process.env.ID_CHANNEL;
        this.client.login(process.env.TOKEN_DISCORD);
    }

    static getInstance() {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    async messageCommand() {
        this.client.on('ready', () => {
            console.log(`Logger đang chạy với tên ${this.client.user?.tag}`);
        });
        this.client.on("messageCreate", (msg) => {
            if (msg.author.bot) return;
            if (msg.content === "hello") {
                msg.reply(`Hello! Xin chào nam nha`);
            }
            if (msg.content == "chao con cac") {
                msg.reply("ơ con cạc cái địt cụ mày");
            }
            if (msg.content == "nam con cac") {
                msg.reply("Nam con cac đó thì sao nào");
            }
            if (msg.content == "nam chào hiệp nha") {
                msg.reply("Hiệp chào lại nam đi");
            }
            if (msg.content == "nam ngu") {
                msg.reply("Nam ngu vcl đúng không hiệp");
            }
            if (msg.content == "nam đẹp trai") {
                msg.reply("Đúng không?");
            }
        })
    }

    async sendToMessage(message = 'message') {
        return this.client.channels.fetch(this.channelId)
            .then((channel: any) => channel.send(message))
            .catch(console.error);
    }

    async commandsMessage() {
        const commands = [
            {
                name: 'ping',
                description: 'Replies with Pong!',
            },
        ];

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN_DISCORD);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(this.channelId), { body: commands });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
}

export default LoggerService