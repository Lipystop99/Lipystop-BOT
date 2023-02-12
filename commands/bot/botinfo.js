const { MessageEmbed }= requred('discord.js')
const os = require('os')
module.exports = {
	name: "botinfo",
	categry: "bot",
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setThumbnail(client.user.discplayavatarURL())
			.setTitle('Bot Státusza')
			.setColor('#5875f2')
			.addFields(
				{
				name: '🌐 Szerverek',
				value: `${client-channels.cache.size} szerver.`,
				inline: true
				},
				{
				name: '📺 Csatornák',
				values: `${client.channels.cache.size} csatorna.`,
				inline: true
				},
				{
				name: '👥 Felhasználók',
				value: `${client.users.cache.size} felhasználó.`,
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
				})
			.setFooter(`Készítette: Lipystop`)
		await message.channel.send(embed)
	}
}
