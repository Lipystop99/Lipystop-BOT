const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "ping",
  category: "információs",
  description: "Kiadja a késési és API Pinget",
  category: "információs",
  timeout: 100000,
    run: async (client, message, args) => {
      const msg = await message.channel.send("Pingelés...");
      const Embed = new MessageEmbed()
        .setTitle("Pong!")
        .setAuthor(`${message.author.username}` , message.author.displayAvatarURL())
        .setDescription(
          `⌛ A bot pingje ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\n⏲️ API Késés ${Math.round(client.ws.ping)}`
        )
        .setColor('#fb644c');
      msg.edit(Embed);
      //msg.edit("\u200b");
    }
};