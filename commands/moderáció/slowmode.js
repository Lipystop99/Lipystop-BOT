const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    category: 'moderáció',
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Nincs meg a **CSATORNÁK_KEZELÉSE** jogod!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Nem mondtál egy időt!').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'Nincs indok';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('A csatorna lassítás már ki van kapcsolva!').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Lassítás kikapcsolva')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason).then(m => m.send(embed));

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('Nem valós időértéket adtál meg!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('Ez túl nagy lassítás, 6 óránál kevesebbet adj meg!').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`A lassítás már ennyire van állítva ${args[0]}`);

        embed.setTitle('Lassítás bekapcsolva')
            .addField('Időkorlát: ', args[0])
            .addField('Indok: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}
