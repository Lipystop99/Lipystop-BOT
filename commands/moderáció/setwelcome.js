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

    console.log('Adatbazisra csatlakozva! - SetWelcome');

});

module.exports = {

  name: "setwelcome",

  aliases: ["setw", "setwelc"],

  description: "Üdvözlő rendszer beállítása **(Interaktív parancs)**",
  category: 'moderáció',

  run: async (client, message, args) => {

    con.query(`SELECT * FROM welcomes WHERE ServerID = '${message.guild.id}'`, async (err, rows) => {

        const WelcomeStatus = rows[0].WelcomeStatus;

        const filter = m => m.author.id === message.author.id && (m.content === "be" || m.content === "ki")

        const options = {

            max: 1,

            time: 180000,

            errors: ["time"]

        };

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`<a:WolfyClose2:738050317580632206> Hékás! Ehhez nincs jogod! (Szükséges jog: **Csatornák kezelése**)`);

        message.channel.send(`Üdvözöllek, ${message.author}! Be vagy ki szeretnéd kapcsolni az üdvözlő rendszert? **(Chatbe írj prefix nélkül egy** ***be*** vagy ***ki*** **szócskát)**`);

        let collector = await message.channel.awaitMessages(filter, options).catch((err) => {

            message.channel.send(":x: | Nem válaszoltál 180 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE welcomes SET WelcomeStatus='ki' WHERE ServerID = ${message.guild.id}`);
            return false;
        });
        if(collector === false){
            return;
        }

        let answer = collector.first().content;

        if(answer === 'be'){

            if(WelcomeStatus === 'be') return message.channel.send('Az üdvözlő rendszer már be van kapcsolva, de csak a te kedvedért ellenőrzöm. Igen, be van kapcsolva :smile: ');

            if(WelcomeStatus === 'ki'){

                con.query(`UPDATE welcomes SET WelcomeStatus='be' WHERE ServerID = ${message.guild.id}`);

                message.channel.send('Az üdvözlő rendszert **bekapcsoltam** csak a te kedvedért. :smile: ');

                message.channel.send('Most kérlek add meg a **csatornát** ahova az üzenetet küldjem majd!');

                let collector2 = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

                    max: 1,

                    time: 100000,

                    errors: ["time"]

                }).catch((err) => {

                    message.channel.send(":x: | Nem válaszoltál 100 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE welcomes SET WelcomeStatus='ki' WHERE ServerID = ${message.guild.id}`);
                    return false;
                });
                if(collector2 === false){
                    return;
                }

                let answer2 = collector2.first();

                let ch = answer2.mentions.channels.first().id;

                con.query(`UPDATE welcomes SET WelcomeChannelID='${ch}' WHERE ServerID = ${message.guild.id}`);

                message.channel.send(`A welcome csatorna beállítva: <#${ch}>`);

                message.channel.send('Most kérlek add meg az üdvözlő üzenet **címét**!');

                message.channel.send('Használható importok:');

                const ImPorts = new MessageEmbed()

                .setDescription('{member} - A becsatlakozó ember nevét írja ki.\n\n{guild} - A szervered nevét írja ki.\n\n{inviter} - Annak a személynek a neve, aki meghívta a becsatlakozót.\n\n{useamount} - Hány meghívása van összesen az inviternek.')

                .setColor('RANDOM');

                message.channel.send(ImPorts);

                //

                //

                //

                //

                //

                //

                let collector3 = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

                    max: 1,

                    time: 100000,

                    errors: ["time"]

                }).catch((err) => {

                    message.channel.send(":x: | Nem válaszoltál 100 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE welcomes SET WelcomeStatus='ki' WHERE ServerID = ${message.guild.id}`);
                    return false;
                });
                if(collector3 === false){
                    return;
                }

                let answer3 = collector3.first().content; 

                console.log(answer3);

                con.query(`UPDATE welcomes SET WelcomeTitle='${answer3}' WHERE ServerID = ${message.guild.id}`);

                function replacer(string) {

                    return string

                      .replace("{member}", 'Pistike')

                      .replace("{guild}", message.guild.name)

                      .replace("{inviter}", 'Józsika')

                      .replace("{useamount}", '20');

                }

                const EmbTitle = replacer(answer3);

                const EmbDemo = new MessageEmbed()

                .setTitle(EmbTitle)

                .setDescription('Ide majd a leírás kerül, ezt mindjárt beállítod.')

                .setFooter(`Bot-Login | Welcome`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')

                .setColor('RANDOM');

                message.channel.send(`A welcome embed így fog kinézni:`);

                message.channel.send(EmbDemo);

                //

                //

                //

                //

                //

                //

                //

                //

                await message.channel.send('Most kérlek add meg az üdvözlő üzenet **leírását**!');

                await message.channel.send('Használható importok:');

                await message.channel.send(ImPorts);

                let collector4 = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

                    max: 1,

                    time: 100000,

                    errors: ["time"]

                }).catch((err) => {

                    message.channel.send(":x: | Nem válaszoltál 100 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE welcomes SET WelcomeStatus='ki' WHERE ServerID = ${message.guild.id}`);
                    return false;
                });
                if(collector4 === false){
                    return;
                }

                let answer4 = collector4.first().content;

                const EmbDescription = replacer(answer4);

                const EmbDemo2 = new MessageEmbed()

                .setTitle(EmbTitle)

                .setDescription(EmbDescription)

                .setFooter(`Bot-Login | Welcome`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')

                .setColor('RANDOM');

                con.query(`UPDATE welcomes SET WelcomeDescription='${answer4}' WHERE ServerID = ${message.guild.id}`);

                message.channel.send(`A welcome embed így fog kinézni:`);

                message.channel.send(EmbDemo2);

                await message.channel.send(`A welcome sikeresen bekapcsolva! Csatorna: <#${ch}> Embed:`);

                message.channel.send(EmbDemo2);

                con.query(`SELECT * FROM prefixes WHERE ServerID = '${message.guild.id}'`, async (err, rowz) => {

                    const prefix = rowz[0].prefix;

                    await message.channel.send(`**Ha szeretnél üdvözlőkártyát beállítani vagy meghívásfigyelőt (invitemanager), használd a** ***${prefix}setinv*** **és a** ***${prefix}setwcard*** **parancsokat!**`);

                })

            }

        }else if(answer === 'ki'){

            if(WelcomeStatus === 'ki') return message.channel.send('Az üdvözlő rendszer már ki van kapcsolva, de csak a te kedvedért kikapcsolom mégegyszer. :smile: ');

            if(WelcomeStatus === 'be'){

                message.channel.send('Az üdvözlő rendszert **kikapcsoltam** csak a te kedvedért. :smile: ');

                con.query(`UPDATE welcomes SET WelcomeStatus='ki' WHERE ServerID = ${message.guild.id}`);

            }

        }

    })

  }

}