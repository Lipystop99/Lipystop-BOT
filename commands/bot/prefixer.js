const { MessageEmbed } = require("discord.js");

const Discord = require("discord.js");

const client = new Discord.Client();

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

    console.log('Adatbazisra csatlakozva! - Prefixer');

});

module.exports = {

    name: "setprefix",

    aliases: ["setp", "setpref"],

    description: "Kiírja az összes parancsot és a leírásukat",

    run: async (client, message, args) => {

        

        con.query(`SELECT * FROM prefixes WHERE ServerID = ${message.guild.id}`, (err, rows) => {
          console.log(message.guild.id)

          if(err) throw err;

    

    

        let notpermission = new Discord.MessageEmbed()

        .setColor('#5865f2')

        .setDescription('⛔ Hozzáférés **Megtagadva** ⛔')

        .setFooter("A parancs használatához **MANAGE_GUILD** jog szükséges");

    

    

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: notpermission})

    

        let notdata = new Discord.MessageEmbed()

        .setColor('#5865f2')

        .setDescription('**Kérlek add meg az új prefixet** (max. 10 character)')

        if(!args[0]) return message.channel.send({embed: notdata})

        //

        

          let notnewprefix = new Discord.MessageEmbed()

          .setColor('#5865f2')

          .setDescription(`**Nem lehet ugyanaz a prefix** (${rows[0].prefix})`)

          if(args[0] === rows[0].prefix) return message.channel.send({embed: notnewprefix})

        //

        let long = new Discord.MessageEmbed()

        .setColor('#5865f2')

        .setDescription('**A prefix nem lehet hosszab mint `10` karakter**')

        if(args[0].length > 10) return message.channel.send({embed: long})

    

    

        con.query(`UPDATE prefixes SET prefix='${args[0]}' WHERE ServerID = ${message.guild.id}`)

        con.query(`SELECT * FROM prefixes WHERE ServerID = ${message.guild.id}`, (err, rows) => {

          let newprefix = new Discord.MessageEmbed()

          .setColor('#5865f2')

          .setDescription('**✅ Sikeresen megváltoztattad a prefixet: ``' + args[0] + '``✅**')

          .setFooter(`Prefixet beállította: ${message.author.tag}`)

          message.channel.send({embed: newprefix})

        })

        

          

        

        })

    }

}