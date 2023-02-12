const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
    name: "nqn",
    category: "extrák",
    run: async (client, message, args) => {
        let guild = message.guild;
        let member = guild.member(message.author);
        let nickname = member ? member.displayName : null;
        const hookc = message.channel.createWebhook("Bot-Login Webhook 1", "https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png");
        const id = hookc.id;
        const token = hookc.token;
        const hookie = new Discord.WebhookClient(id, token);
        hookie.edit(nickname, message.author.displayAvatarURL());
        hookie.send(args);
        hookie.edit("Bot-Login Webhook 1", "https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png").catch(console.error);
    }
}