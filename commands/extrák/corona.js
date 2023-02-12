const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "corona",
    category: "extrák",
    run: async (client, message, args) => {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** nem létezik, vagy még nincs onnan adat.`)
        }

        const embed = new MessageEmbed()
            .setTitle(args[0] ? `${args[0].toUpperCase()} Állapota` : 'A Világ Teljes Koronavírus Állapota')
            .setColor('#fb644c')
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
            .addFields(
                {
                    name: 'Összes eset:',
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Elhunytak:',
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Gyógyultak:',
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Aktív Betegek:',
                    value: corona.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Kritikus Állapotúak:',
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Mai gyógyultak:',
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: 'Mai halálok:',
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(embed)
    }
};