const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "decode",
    category: "extrák",
    run: async (client, message, args) => {
        const text = args.join(" ").replace(" ", "%20")
        const url = `http://some-random-api.ml/binary?decode=${text}`;
        message.delete();
        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`Hiba történt!`)
        }

        const embed = new MessageEmbed()
            .setTitle('Bináris szöveg dekódolása')
            .setDescription(data.text)

        await message.channel.send(embed)
    }
}