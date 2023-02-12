const canva = require('canvacord');
const Discord = require('discord.js');

module.exports = {
    name: "trigger",
    category: "képes",
    run: async (client, message, args) => {
        if(!message.mentions.users.first()){
            const first = message.author.displayAvatarURL({dynamic: false, format: "png"});
            const url = await canva.Canvas.trigger(`${first}?size=1024`);
            const image = new Discord.MessageAttachment(url, "triggered.gif")
            message.channel.send(image);
            return;
        }
        const first2 = message.mentions.users.first().displayAvatarURL({dynamic: false, format: "png"});
        const url2 = await canva.Canvas.trigger(`${first2}?size=1024`);
        const image2 = new Discord.MessageAttachment(url2, "triggered.gif")
        message.channel.send(image2);
    }
}