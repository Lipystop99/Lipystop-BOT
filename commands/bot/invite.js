const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "invite",
    aliases: ["botinvite"],
    description: "A botot további szerverre is meg lehet hívni.",
    run: async (client, message, args) => {
        message.delete();
      let user = message.mentions.users.first() || message.author
      let info = new MessageEmbed()
      .setTitle(`Hívd meg Lipystop -ot a szerveredre!`)
      .setColor('#24CC45')
      .setDescription(`[[Katt ide]](https://discord.com/oauth2/authorize?client_id=700016360830533713&scope=bot&permissions=8589934591) Lipystop meghívásához`)
      .setFooter(`Lipystop | Invite`)
      .setImage(client.user.displayAvatarURL())
    message.channel.send(info);
    }
}
