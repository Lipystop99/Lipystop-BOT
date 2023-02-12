const { MessageEmbed } = require("discord.js");
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

    console.log('Adatbazisra csatlakozva! - PointSyS Reset');

});

module.exports = {
    name: "removepoints",
    category: "rendszerek",
    run: async (client, message, args) => {
        message.delete();
        var str_replace = require('str_replace');
        let sname = message.guild.name
        let sname2 = str_replace(`'`,``,`${sname}`);
        let sname3 = str_replace(`"`,``,`${sname2}`)
        let sname4 = str_replace('`','',sname3);
        const user = message.mentions.users.first();
        if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(`${message.author} Ne próbálkozz, senkinek nem tudod a pontjait resetelni :))`)
            return;
        }
        if(!args[0]){
            message.channel.send('Nem adtad meg kinek a pontjait reseteljem!')
            return;
        }
        con.query(`SELECT * FROM pointsystem WHERE ServerID = ${message.guild.id} AND UserID = ${user.id}`, (err, rows) => {
            if(!rows[0]){
                con.query(`INSERT INTO pointsystem (ServerName, ServerID, UserName, UserID, UserPoints) VALUES ('${sname4}', '${message.guild.id}', '${user.username}', '${user.id}', '0')`)
                const alma = new MessageEmbed()
                .setTitle("PointSystem")
                .setDescription(`Sikeresen reseteltem ${user.username} felhasználó pontjait!`)
                .setTimestamp()
                .setFooter('Bot-Login | PointSystem', client.user.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/736907123421872253/789792666522746880/minus.png')
                .setColor("ORANGE");
                message.channel.send(alma);
                return;
            }
            con.query(`UPDATE pointsystem SET UserPoints = '0' WHERE ServerID = '${message.guild.id}' AND UserID = '${user.id}';`)
            const alma2 = new MessageEmbed()
                .setTitle("PointSystem")
                .setDescription(`Sikeresen reseteltem ${user.username} felhasználó pontjait!`)
                .setTimestamp()
                .setFooter('Bot-Login | PointSystem', client.user.displayAvatarURL())
                .setThumbnail('https://media.discordapp.net/attachments/736907123421872253/789792666522746880/minus.png')
                .setColor("ORANGE");
            message.channel.send(alma2);
        })
    }
}