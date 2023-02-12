const { MessageEmbed } = require("discord.js");
const { LOCALE } = require("../../core/musiccore");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "helpmusic",
  category: "zene",
  aliases: ["h"],
  description: i18n.__("help.description"),
  run: (client, message, args) => {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
