const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "silent",
    category: "extrák",
    run: async (client, message, args) => {
        message.delete();
        const alma = args.join(" ");
        const upped = alma.toLowerCase();
        message.channel.send(`${message.author.username} nem tud beszélni, elment a hangja, ezért ezt suttogja: ${upped}`)
    }
}