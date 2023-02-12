const { MessageEmbed } = require("discord.js");
const aIDs = '593491574713745418' || '694463735376642118' || '625256350217273359';

module.exports = {
  name: "avatar",
  category: 'képes',
  description: "Kiadja egy felhasználó profilképét.",
  run: async (client, message, args) => {
    message.delete();
    let muser = message.mentions.users.first() || message.author
    let aEmbed = new MessageEmbed()

    .setImage(`${muser.displayAvatarURL()}?size=1024`)
    .setColor('RANDOM')
    .setTitle(`${muser.username} Profilképe`)
    .setFooter(`Wolfy | Avatar`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
    .setTimestamp();

    message.channel.send(aEmbed).catch(console.error);;
  }
};
