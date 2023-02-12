const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "capslock",
    category: "extrák",
    run: async (client, message, args) => {
        message.delete();
        const alma = args.join(" ");
        const upped = alma.toUpperCase();
        message.channel.send(`${message.author.username} ideges, és csak annyit szeretne mondani, hogy: ${upped}`)
    }
}