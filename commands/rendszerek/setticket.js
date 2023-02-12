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

    console.log('Adatbazisra csatlakozva! - SetTicket');

});

module.exports = {
    name: "setticket",
    category: "rendszerek",
    run: async (client, message, args) => {
        con.query(`SELECT * FROM ticketsys WHERE ServerID = ${message.guild.id}`, async (err, rows) => {
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
                message.channel.send(`Nem adtad meg, hogy be vagy ki kapcsoljam a rendszert! (Helyes használat: **setticket <on/off/current> [#csatorna]**)`)
                return;
            }
            if(!args[0] === 'on' || !args[0] === 'off' || !args[0] === 'current'){
                message.channel.send("Helyes használat: **setticket <on/off/current> [#csatorna]**")
                return;
            }
            if(args[0] === 'on'){
                if(!user){
                    message.channel.send('Nem jelölted meg a csatornát, amibe majd az üzenet kerül amire reagálni kell! (Helyes használat: **setticket <on/off/current> [#csatorna]**)')
                    return;
                }
                if(!rows[0]){
                    var ticketmake = new MessageEmbed()
                    .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
                    .setTimestamp()
                    .setColor(0xFF8C00)
                    .setTitle("Ticket")
                    .setDescription("Ticket készítéséhez kérlek reagálj a 🎟️ emojival!")
                    .setThumbnail("https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png")
                    var ticketmake2 = await user.send(ticketmake);
                    await ticketmake2.react('🎟️')
                    const messid = await ticketmake2.id;
                    con.query(`INSERT INTO ticketsys (ServerName, ServerID, Status, MessageID) VALUES ('${sname4}', '${message.guild.id}', 'on', '${messid}')`)
                    const alma = new MessageEmbed()
                    .setTitle("Bot-LoginTicket")
                    .setDescription(`Sikeresen beállítottam a ticket csatornát! (Reagálj a ticket üzenetre ticket nyitásához.)`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Ticket', client.user.displayAvatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setColor('#ffbf00');
                    message.channel.send(alma);
                    return;
                }
                var ticketmake = new MessageEmbed()
                    .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
                    .setTimestamp()
                    .setColor(0xFF8C00)
                    .setTitle("Ticket")
                    .setDescription("Ticket készítéséhez kérlek reagálj a 🎟️ emojival!")
                    .setThumbnail("https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png")
                var ticketmake2 = await user.send(ticketmake);
                await ticketmake2.react('🎟️')
                const messid = await ticketmake2.id;
                con.query(`UPDATE ticketsys SET Status = 'on', MessageID = '${messid}' WHERE ServerID = '${message.guild.id}';`)
                const alma2 = new MessageEmbed()
                    .setTitle("Bot-LoginTicket")
                    .setDescription(`Sikeresen beállítottam a ticket csatornát! (Reagálj a ticket üzenetre ticket nyitásához.)`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Ticket', client.user.displayAvatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setColor('#ffbf00');
                message.channel.send(alma2);
                return;
            }else if(args[0] === 'off'){
                if(!rows[0]){
                    con.query(`INSERT INTO ticketsys (ServerName, ServerID, Status) VALUES ('${sname4}', '${message.guild.id}', 'off')`)
                    const alma3 = new MessageEmbed()
                    .setTitle("Bot-LoginTicket")
                    .setDescription(`Sikeresen kikapcsoltam a Ticket rendszert!`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Ticket', client.user.displayAvatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setColor('#ffbf00');
                    message.channel.send(alma3);
                    return;
                }
                con.query(`UPDATE ticketsys SET Status = 'off' WHERE ServerID = '${message.guild.id}';`)
                const alma4 = new MessageEmbed()
                    .setTitle("Bot-LoginTicket")
                    .setDescription(`Sikeresen kikapcsoltam a Ticket rendszert!`)
                    .setTimestamp()
                    .setFooter('Bot-Login | Ticket', client.user.displayAvatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setColor('#ffbf00');
                message.channel.send(alma4);
                return;
            }else if(args[0] === 'current'){
                const alma5 = new MessageEmbed()
                    .setTitle("Bot-LoginTicket")
                    .setTimestamp()
                    .setFooter('Bot-Login | Ticket', client.user.displayAvatarURL())
                    .setThumbnail('https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
                    .setColor('#ffbf00');
                const status = rows[0].Status;
                if(status === 'on'){
                    alma5.setDescription(`A Ticket rendszer jelenleg ki van kapcsolva.`);
                    message.channel.send(alma5);
                }else if(status === 'off'){
                    alma5.setDescription(`A Ticket rendszer jelenleg be van kapcsolva.`);
                    message.channel.send(alma5);
                }
                return;
            }
        })
    }
}