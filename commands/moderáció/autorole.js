const { MessageEmbed } = require("discord.js");

const fs = require("fs");

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

    console.log('Adatbazisra csatlakozva! - AutoRole');

});

module.exports = {

  name: "autorole",

  aliases: ["autoro", "autor", "arole"],
  category: 'moderáció',

  description: "AutoRole (csatlakozáskor a csatlakozó tag megkap automatikusan egy adott rangot) rendszer beállítása **(Interaktív parancs)**",

  run: async (client, message, args) => {

    con.query(`SELECT * FROM autoroles WHERE ServerID = '${message.guild.id}'`, async (err, rows) => {

        const status = rows[0].AutoRoleStatus;

        const filter = m => m.author.id === message.author.id && (m.content === "be" || m.content === "ki")

        const options = {

            max: 1,

            time: 40000,

            errors: ["time"]

        };

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(`<a:WolfyClose2:738050317580632206> Hékás! Ehhez nincs jogod! (Szükséges jog: **Jogok kezelése**)`);

        message.channel.send(`Üdvözöllek, ${message.author}! Be vagy ki szeretnéd kapcsolni az autorole rendszert? **(Chatbe írj prefix nélkül egy** ***be*** vagy ***ki*** **szócskát)**`);

        let collector = await message.channel.awaitMessages(filter, options).catch((err) => {

            return message.channel.send(":x: | Nem válaszoltál 40 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE autoroles SET AutoRoleStatus='${status}' WHERE ServerID = ${message.guild.id}`);

        });

        let answer = collector.first().content;

        if(answer === 'be'){

            if(status === 'be') return message.channel.send('Az üdvözlő rendszer már be van kapcsolva, de csak a te kedvedért ellenőrzöm. Igen, be van kapcsolva :smile: ');

            if(status === 'ki'){

                con.query(`UPDATE autoroles SET AutoRoleStatus='be' WHERE ServerID = ${message.guild.id}`);

                message.channel.send('Az autorole rendszert **bekapcsoltam** csak a te kedvedért. :smile: ');

                message.channel.send('Most kérlek add meg a **rangot** amit a becsatlakozó tagoknak automatikusan odaadjak majd!');

                let collector2 = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

                    max: 1,

                    time: 40000,

                    errors: ["time"]

                }).catch((err) => {

                    return message.channel.send(":x: | Nem válaszoltál 40 másodpercen belül, beállítás megszakítva!"), con.query(`UPDATE autoroles SET AutoRoleStatus='ki' WHERE ServerID = ${message.guild.id}`);

                });;

                let answer2 = collector2.first();

                let role = answer2.mentions.roles.first().id;

                con.query(`UPDATE autoroles SET RoleID='${role}' WHERE ServerID = ${message.guild.id}`);

                const embed = new MessageEmbed()

                .setDescription(` <a:WolfyCheck3:738036320311705600> Az autorole rendszer beállítva! A tagok a <@&${role}> rangot fogják automatikusan megkapni! <a:WolfyCheck3:738036320311705600> `);

                message.channel.send(embed);

                con.query(`SELECT * FROM prefixes WHERE ServerID = '${message.guild.id}'`, async (err, rowz) => {

                    const prefix = rowz[0].Prefix;

                    await message.channel.send(`**Ha szeretnél üdvözlőkártyát, üdvözlő üzenetet vagy meghívásfigyelőt (invitemanager) beállítani, használd a** ***${prefix}setinv*** **,** ***${prefix}setw*** **és a** ***${prefix}setwcard*** **parancsokat!**`);

                })

            }

        }else if(answer === 'ki'){

            if(status === 'ki') return message.channel.send('Az autorole rendszer már ki van kapcsolva, de csak a te kedvedért kikapcsolom mégegyszer. :smile: ');

            if(status === 'be'){

                message.channel.send('Az autorole rendszert **kikapcsoltam** csak a te kedvedért. :smile: ');

                con.query(`UPDATE autoroles SET AutoRoleStatus='ki' WHERE ServerID = ${message.guild.id}`);

            }

        }

    })

  }

}