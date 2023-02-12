const { MessageEmbed } = require("discord.js");
const mysql = require("mysql2");
const con = mysql.createConnection({

    host: "localhost",

    port: "3306",

    user: "botlogin",

    password: "28l[2CEogPi9)SqM",

    database: "botlogin",

    charset: "utf8mb4"

});
con.connect(err => {

    if(err) throw err;

    console.log('Adatbazisra csatlakozva! - PointSyS List');

});

module.exports = {
    name: "points",
    category: "rendszerek",
    run: async (client, message, args) => {
        message.delete();
        const user = message.mentions.users.first() || message.author;
        con.query(`SELECT * FROM pointsystem WHERE ServerID = ${message.guild.id} AND UserID = ${user.id}`, (err, rows) => {
            if(!rows[0]){
                const alma = new MessageEmbed()
                .setTitle("PointSystem")
                .setDescription(`${user.username} felhasználónak jelenleg egy pontja sincs.`)
                .setTimestamp()
                .setFooter('Bot-Login | PointSystem', client.user.displayAvatarURL())
                .setColor("RED");
                message.channel.send(alma);
                return;
            }
            if(rows[0].UserPoints === '0'){
                const alma3 = new MessageEmbed()
                .setTitle("PointSystem")
                .setDescription(`${user.username} felhasználónak jelenleg egy pontja sincs.`)
                .setTimestamp()
                .setFooter('Bot-Login | PointSystem', client.user.displayAvatarURL())
                .setColor("RED");
                message.channel.send(alma3);
                return;
            }
            const alma2 = new MessageEmbed()
                .setTitle("PointSystem")
                .setDescription(`${user.username} felhasználónak jelenleg ${rows[0].UserPoints} pontja van.`)
                .setTimestamp()
                .setFooter('Bot-Login | PointSystem', client.user.displayAvatarURL())
                .setColor("GREEN");
            message.channel.send(alma2);
        })
    }
}