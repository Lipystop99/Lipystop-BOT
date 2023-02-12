const { MessageEmbed } = require("discord.js");
//const core = require("../../core/core.js");
module.exports = {
    name: "userinfo",
    aliases: ["ui", "useri", "uinfo"],
    description: "Kiír információkat egy adott felhasználóról.",
    category: "információs",
    run: async (client, message, args) => {
        message.delete();
        let user = message.mentions.users.first() || message.author
        //console.log(core.alma);
        let info = new MessageEmbed()
          .setTitle(`${user.username} Információi`)
          .setColor('RANDOM')
          .setFooter(`Bot-Login | UserInfo`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
          .setThumbnail(user.displayAvatarURL())
          .setDescription(`**Név:** ${user.username}\n\n**Felhasználó Létrehozva:** ${user.createdAt}\n\n**Felhasználói ID:** ${user.id}\n\n**Felhasználó állapota:** ${user.presence}\n\n**Felhasználó Tag-je:** ${user.tag}\n\n**Felhasználó Profilképe Oldalt...**\n`)
        message.channel.send(info);
    }
}