const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "invite",
    aliases: ["inv", "botinvite", "botinv"],
    description: "Kiír információkat egy adott felhasználóról.",
    run: async (client, message, args) => {
        message.delete();
      let user = message.mentions.users.first() || message.author
      let info = new MessageEmbed()
      .setTitle(`Hívd meg Bot-Login -t a szerveredre!`)
      .setColor('#5865f2')
      .setDescription(`[[Katt ide]](https://discord.com/api/oauth2/authorize?client_id=1069241123928805509&scope=bot&permissions=8589934591) Bot-Login meghívásához`)
      .setFooter(`Bot-Login | Invite`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
      .setImage('https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
    message.channel.send(info);
    }
}