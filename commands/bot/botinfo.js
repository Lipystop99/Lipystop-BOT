const { MessageEmbed } = require('discord.js')
const os = require('os')
module.exports = {
    name: "botinfo",
    category: "bot",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Státusza')
            .setColor('#5865f2')
            .addFields(
                {
                    name: '🌐 Szerverek',
                    value: `${client.guilds.cache.size} szerver.`,
                    inline: true
                },
                {
                    name: '📺 Csatornák',
                    value: `${client.channels.cache.size} csatorna.`,
                    inline: true
                },
                {
                    name: '👥 Felhasználók',
                    value: `${client.users.cache.size} felhasználó`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Csatlakozva',
                    value: client.user.createdAt,
                    inline: true
                },
                {
                    name: 'Szervergép Info',
                    value: `Coreok: ${os.cpus().length}`,
                    inline: true
                }
            )
            .setFooter(`Bot-Login | Botinfo`, 'https://cdn.discordapp.com/avatars/772911197384212480/a_518d1ed1540dae3254efede9c0bf8e18.gif')

        await message.channel.send(embed)
    }
}
