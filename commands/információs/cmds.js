const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const mysql = require("mysql2");
const con = mysql.createConnection({

    host: "localhost",

    port: "3307",

    user: "botlogin",

    password: "12AZ52hk45SDGF67",

    database: "botlogin",

    charset: "utf8mb4"

});
con.connect(err => {
    if(err) throw err;
    console.log('Adatbazisra csatlakozva! - Help/cmds');
});
module.exports = {
  name: "commands",
  aliases: ["cmds"],
  category: 'információs',
  description: "Kiírja az összes parancsot és a leírásukat",
  run: async (client, message, args) => {
    con.query(`SELECT * FROM prefixes WHERE ServerID = '${message.guild.id}'`, (err, rows) => {
    const prefix = rows[0].prefix;
    message.delete();
    let commands = message.client.commands.array();
    let helpEmbed = new MessageEmbed()
      .setTitle("Bot-Login")
      .setDescription("A parancsok listája")
      .setFooter(`Bot-Login | Help`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  });
  }
};
