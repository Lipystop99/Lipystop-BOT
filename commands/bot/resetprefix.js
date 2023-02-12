const fs = require("fs");

const Discord = require("discord.js");

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

    console.log('Adatbazisra csatlakozva! - Resetprefix');

});



module.exports = {

    name: "resetprefix",

    aliases: ["resp", "resetp"],

    description: "Visszaállítja a prefixet `##`-re(A parancs prefixtől függetlenül ***##*** prefixet használva is működik)",

    run: async (client, message, args) => {

        message.delete();

        con.query(`UPDATE prefixes SET prefix='##' WHERE ServerID = ${message.guild.id}`)

        con.query(`SELECT * FROM prefixes WHERE ServerID = ${message.guild.id}`, (err, rows) => {

          let newprefix = new Discord.MessageEmbed()

          .setColor('#5865f2')

          .setDescription('**✅ Sikeresen megváltoztattad a prefixet: ``' + "##" + '``✅**')

          .setFooter(`Prefixet beállította: ${message.author.tag}`)

          message.channel.send({embed: newprefix})

        })

    }

}