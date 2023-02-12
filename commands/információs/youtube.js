const axios = require('axios');
const api = require('../.././botconfig.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "youtube",
    category: "információs",
    run: async (client, message, args) => {
        api_key = api.YOUTUBE_API_KEY;

        if (!args[0]) {
            return message.channel.send(`Kérlek adj meg egy YouTube csatorna ID-t!`);
        }

        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics%2CcontentDetails%2CbrandingSettings%2Csnippet&id=${args[0]}&key=AIzaSyBGi7IA2JpGya40iLlIk4Wd8nJY6HqzckI`;

        let response, channel, info;

        try {
            response = await axios.get(url)
            channel = response.data
            info = channel.items[0]
        } catch (e) {  
            return message.channel.send(`A csatorna nem található.`)
        }

        const embed = new MessageEmbed()
            .setTitle(info.brandingSettings.channel.title)
            .setThumbnail(info.snippet.thumbnails.default.url)
            .setColor(info.brandingSettings.channel.profileColor)
            .addFields(
                {
                    name: "Feliratkozók: ",
                    value: info.statistics.hiddenSubsciberCount ? `A feliratkozók száma rejtett!` : info.statistics.subscriberCount
                },
                {
                    name: "Csatorna megtekintései: ",
                    value: info.statistics.viewCount,
                    inline: true
                },
                {
                    name: 'Összes videók: ',
                    value: info.statistics.videoCount,
                    inline: true
                },
                {
                    name: "Csatorna leírása: ",
                    value: info.snippet.description
                }
            )
        await message.channel.send(embed)
    }
}