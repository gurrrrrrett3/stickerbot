import { channel } from "diagnostics_channel";
import { ChannelType, Client } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
    intents: ["Guilds", "GuildMessages", "GuildEmojisAndStickers"],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
})

client.on("messageCreate", async (message) => {
    if (message.stickers.size == 0) return;
    if (message.channel.type == ChannelType.GuildText && message.channel.name == "stickers") {
       message.channel.send({ content: message.stickers.map(sticker => `${sticker.name}: ${sticker.url}`).join("\n")});
    }  
})

client.login(process.env.TOKEN);


