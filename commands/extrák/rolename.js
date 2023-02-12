const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'rolename',
    category: 'extrák',
    run: async (client, message, args) => {
        // code starts here
        try {
            const roleName = message.mentions.roles.first() || message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()))
            const perms = new Permissions(roleName.permissions.bitfield).toArray()

            const embed = new MessageEmbed()
                .setColor(roleName.color)
                .setTitle(roleName.name)
                .addFields(
                    {
                        name: 'Rang ID: ',
                        value: roleName.id,
                        inline: true
                    },
                    {
                        name: 'Rang Neve: ',
                        value: roleName.name,
                        inline: true
                    },
                    {
                        name: 'Megemlíthető: ',
                        value: roleName.mentionable ? 'Igen' : 'Nem',
                        inline: true
                    },
                    {
                        name: 'Rang jogai: ',
                        value: perms.join(', ')
                    }
                )

            await message.channel.send(embed)

        } catch (e) {
            return message.channel.send('A rang nem létezik.').then(() => console.log(e))
        }

    }
}
