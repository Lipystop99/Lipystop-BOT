const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "wink",
    category: "képes",
    run: async (client, message, args) => {
        const url = 'https://some-random-api.ml/animu/wink';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`Hiba történt!`)
        }
        if(!message.mentions.users.first()){
            const embed2 = new MessageEmbed()
            .setTitle(`${message.author.username} kacsint egyet`)
            .setImage(data.link)

            await message.channel.send(embed2)
            return;
        }
        const embed = new MessageEmbed()
            .setTitle(`${message.author.username} rákacsint ${message.mentions.users.first().username || message.mentions.members.first()}-ra/re`)
            .setImage(data.link)

        await message.channel.send(embed)
    }
}