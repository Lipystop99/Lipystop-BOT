const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "alpaca",
    category: "állatok",
    run: async (client, message, args) => {
        const url = "https://apis.duncte123.me/animal/alpaca";

        let image, response;
        try {
            response = await axios.get(url, { headers: { 'User-Agent': 'Bot-Login#0529'} } );
            image = response.data.data.file;

        } catch (e) {
            return message.channel.send(`Hiba merült fel!`)
        }
        const embed = new MessageEmbed()
            .setTitle(`Random Alpakás Kép`)
            .setColor(`#f3f3f3`)
            .setImage(image)

        await message.channel.send(embed)
    }
}