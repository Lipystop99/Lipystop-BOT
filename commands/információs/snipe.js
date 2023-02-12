const fetch = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "snipe",
    category: "extrák",
    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if(!msg) return message.channel.send("Ebben a csatornában nincsenek memorizált törölt üzenetek!")
        let embed = new MessageEmbed()
            .setAuthor(msg.author)
            .setDescription(msg.content);
        if(msg.image)embed.setImage(msg.image)
        message.channel.send(embed)        
    }
}