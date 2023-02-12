const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    category: 'moderáció',
    run: async (client, message, args) => {
        let messageArray = message.content.split(" ");
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:WolfyClose2:738050317580632206> Hékás! Ehhez nincs jogod! (Szükséges jog: **Kick**)`);
            console.log(`${message.author.username} használta a ban parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`); 
            let toBan
            try{
                toBan = message.mentions.members.first() || await client.users.fetch(args[0]) 
            }catch{
                return message.channel.send(`<a:WolfyClose2:738050317580632206> Mindenhol kerestem, még a szekrényben is, de nem találok ilyen nevű felhasználót: **${args[0]}** `);
            }
            let reason = message.content
            .split(' ')
            .slice(2)
            .join(' ');
            if (!reason) {
                reason = 'Nincs indok megadva.';
            }
            if (!args[0]) return message.channel.send(`<a:WolfyClose2:738050317580632206> Nem mondtad kit bannoljak. Így nem tudom kit kell! **(ban [@név] [indok])**`);
            if(!reason) return message.channel.send(`<a:WolfyClose2:738050317580632206> Oktalanul nem tudok bannolni... Adj meg egy okot! **(ban [@név] [indok])**`);
        try {
            //toBan.send(`Haver! Mi történt? Kibannoltak a **${message.guild.name}** szerverről. Hogy miért? Itt az ok: **${reason}**`).catch(() => message.channel.send("Ennek a felhasználónak nem tudok privátban üzenni, de azért banoltam!"));
            await message.guild.members.ban(toBan, { reason: `Banolva ${message.author.username} által, indok: ${reason}`})
            let x = new MessageEmbed()
            .setColor("RED")
            .setTitle("🔨A BanHammer Lesújtott!🔨")
            .setThumbnail("https://i.imgur.com/l5AFFhc.gif")
            .setDescription(`<a:WolfyCheck3:738036320311705600> Sikeresen Bannoltam!`)
            .addField(`Őt kellett bannolnom:`, `${toBan}`)
            .addField("Aki akarta, hogy bannoljam:", `${message.author}`)
            .addField("Miért kellett bannolnom:", `${reason}`)
            .setFooter(`Wolfy | Ban`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
            .setTimestamp()
            await message.channel.send(x)
        } catch (e) {
            console.log(e);
            message.channel.send(`<a:WolfyClose2:738050317580632206> Hoppá! Úgy látom valami nem jó! A rangomnak adj minden jogot, és húzd fel legfelülre! Ha így sem megy, szólj **WonderCraft#6663**-nak, ő segít neked! 😃`);
        }

    }
}