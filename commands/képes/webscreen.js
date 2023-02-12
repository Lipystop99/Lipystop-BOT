const { MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
    name: "webscreen",
    category: "képes",
    run: async (client, message, args) => {
        if(!args[0]){
            message.channel.send('Kérlek adj meg egy weboldalt!')
            return;
        }
        const url = `https://image.thum.io/get/${args[0]}`;
        const alma = new MessageEmbed()
        .setTitle('Weboldal Képernyőkép')
        .setImage(url);
        message.channel.send(alma);
    }
}