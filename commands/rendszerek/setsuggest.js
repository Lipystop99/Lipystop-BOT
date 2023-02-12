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

    console.log('Adatbazisra csatlakozva! - SetSuggest');

});

module.exports = {
    name: "setsuggest",
    category: "rendszerek",
    run: async (client, message, args) => {
        con.query(`SELECT * FROM suggestionsys WHERE ServerID = ${message.guild.id}`, (err, rows) => {
            message.delete();
            var str_replace = require('str_replace');
            let sname = message.guild.name
            let sname2 = str_replace(`'`,``,`${sname}`);
            let sname3 = str_replace(`"`,``,`${sname2}`)
            let sname4 = str_replace('`','',sname3);
            const user = message.mentions.channels.first();
            if(!message.member.hasPermission("MANAGE_CHANNELS")){
                message.channel.send(`${message.author} Nemnem, te nem állítgathatod ezt!`)
                return;
            }
            if(!args[0]){
                message.channel.send(`Nem adtad meg, hogy be vagy ki kapcsoljam a rendszert! (Helyes használat: **setsuggest <on/off/current> [#csatorna]**)`)
                return;
            }
            if(!args[0] === 'on' || !args[0] === 'off' || !args[0] === 'current'){
                message.channel.send("Helyes használat: **setsuggest <on/off/current> [#csatorna]**")
                return;
            }
            if(args[0] === 'on'){
                if(!user){
                    message.channel.send('Nem jelölted meg a csatornát, amibe majd a javaslatok érkezzenek! (Helyes használat: **setsuggest <on/off/current> [#csatorna]**)')
                    return;
                }
                if(!rows[0]){
                    con.query(`INSERT INTO suggestionsys (ServerName, ServerID, Status, ChannelID) VALUES ('${sname4}', '${message.guild.id}', 'on', '${user.id}')`)
                    const alma = new MessageEmbed()
                    .setTitle("Bot-LoginSuggest")
                    .setDescription(`Sikeresen beállítottam a suggestion csatornát! (<#${user.id}>, **suggest <ötlet>**)`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Bot-LoginSuggest', client.user.displayAvatarURL())
                    .setThumbnail('https://i.pinimg.com/originals/f1/88/9b/f1889b20c5ba5233582dfda4f07eef12.png')
                    .setColor('#ffbf00');
                    message.channel.send(alma);
                    return;
                }
                con.query(`UPDATE suggestionsys SET Status = 'on', ChannelID = '${user.id}' WHERE ServerID = '${message.guild.id}';`)
                const alma2 = new MessageEmbed()
                    .setTitle("Bot-LoginSuggest")
                    .setDescription(`Sikeresen beállítottam a suggestion csatornát! (<#${user.id}>, **suggest <ötlet>**)`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Bot-LoginSuggest', client.user.displayAvatarURL())
                    .setThumbnail('https://i.pinimg.com/originals/f1/88/9b/f1889b20c5ba5233582dfda4f07eef12.png')
                    .setColor('#ffbf00');
                message.channel.send(alma2);
                return;
            }else if(args[0] === 'off'){
                if(!rows[0]){
                    con.query(`INSERT INTO suggestionsys (ServerName, ServerID, Status) VALUES ('${sname4}', '${message.guild.id}', 'off')`)
                    const alma3 = new MessageEmbed()
                    .setTitle("Bot-LoginSuggest")
                    .setDescription(`Sikeresen kikapcsoltam a Suggest rendszert!`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Bot-LoginSuggest', client.user.displayAvatarURL())
                    .setThumbnail('https://i.pinimg.com/originals/f1/88/9b/f1889b20c5ba5233582dfda4f07eef12.png')
                    .setColor('#ffbf00');
                    message.channel.send(alma3);
                    return;
                }
                con.query(`UPDATE suggestionsys SET Status = 'off' WHERE ServerID = '${message.guild.id}';`)
                const alma4 = new MessageEmbed()
                    .setTitle("Bot-LoginSuggest")
                    .setDescription(`Sikeresen kikapcsoltam a Suggest rendszert!`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Bot-LoginSuggest', client.user.displayAvatarURL())
                    .setThumbnail('https://i.pinimg.com/originals/f1/88/9b/f1889b20c5ba5233582dfda4f07eef12.png')
                    .setColor('#ffbf00');
                message.channel.send(alma4);
                return;
            }else if(args[0] === 'current'){
                const alma5 = new MessageEmbed()
                    .setTitle("Bot-LoginSuggest")
                    .setTimestamp()
                    .setFooter('Bot-Login | Bot-LoginSuggest', client.user.displayAvatarURL())
                    .setThumbnail('https://i.pinimg.com/originals/f1/88/9b/f1889b20c5ba5233582dfda4f07eef12.png')
                    .setColor('#ffbf00');
                const status = rows[0].Status;
                if(status === 'on'){
                    alma5.setDescription(`A Suggest rendszer jelenleg ki van kapcsolva.`);
                    message.channel.send(alma5);
                }else if(status === 'off'){
                    alma5.setDescription(`A Suggest rendszer jelenleg be van kapcsolva, \naz ötletek a(z) <#${rows[0].ChannelID}> csatornára érkeznek.`);
                    message.channel.send(alma5);
                }
                return;
            }
        })
    }
}