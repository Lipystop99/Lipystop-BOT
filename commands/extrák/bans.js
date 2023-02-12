const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "bans",
    category: "extrák",
    run: async (client, message, args) => {

        message.guild.fetchBans().then(bans => {
            message.channel.send(`${bans.size} `)
        })

    }
}