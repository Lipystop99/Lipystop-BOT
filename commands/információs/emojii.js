const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
    name: "emojiinfo",
    aliases: ["emojii", "einfo", "emoi", "einf"],
    category: 'információs',
    description: "Kiírja egy adott emoji összes információját.",
    run: async (client, message, args) => {
        
        if(!args[0]) return message.channel.send('Báttya! Kéne az az emoji amit elemezzek neked!');
        try {
            const emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);
            const id = emoji.id;
            const name = emoji.name;
            const animated = emoji.animated;
            const guild = emoji.guild.name;
            const idf = emoji.identifier;
            const crt = emoji.createdAt;
            const url = emoji.url;
            const emembed = new Discord.MessageEmbed()
            .setTitle('Emoji informacioi')
            .setTimestamp()
            .setColor('RANDOM')
            .setThumbnail(emoji.url)
            .setFooter(`Wolfy | Emoji Info`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
            .setDescription(`**Emoji neve:** ${name}\n\n**Emoji ID-je:** ${id}\n\n**Emoji szervere:** ${guild}\n\n**Emoji Identifierje:** ${idf}\n\n**Emoji URL-je:** ${url}\n\n**Emoji Létrehozási Ideje:** ${crt}\n\n**Animáltság:** ${animated}`);
            message.channel.send(emembed);
        }catch(error) {
            console.log(error);
            message.channel.send(`:x: | Hoppá! Úgy látom valami nem jó! Biztos létező emojit adtál meg? 😃`);
        }
    }
}