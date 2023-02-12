  
const Timeout = new Set();
const {MessageEmbed} = require('discord.js');
const ms = require('ms');
const mysql = require("mysql2");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, 
	muteThreshold: 7, 
	kickThreshold: 15,
	banThreshold: 20, 
	maxInterval: 2000,
	warnMessage: '{@user}, Kérlek ne spammelj. :c', 
	kickMessage: '**{user_tag}** kickelve lett spamelés miatt. :c', 
	muteMessage: '**{user_tag}** némítva lett spamelés miatt. :c',
	banMessage: '**{user_tag}** banolva lett spamelés miatt. :c', 
	maxDuplicatesWarning: 6, 
	maxDuplicatesKick: 10,
	maxDuplicatesBan: 12, 
	maxDuplicatesMute: 8, 
	ignoredPermissions: [ 'ADMINISTRATOR'], 
	ignoreBots: true, 
	verbose: true, 
	ignoredMembers: [], 
	muteRoleName: "Muted", 
	removeMessages: true 
});
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
    console.log('Adatbazisra csatlakozva! - Message');
});

module.exports = async (bot , message) => {
    antiSpam.message(message)
    if(message.channel.type === 'dm') return;
    if(message.author === bot.user) return;
    if(message.channel.id === '819086447301754881') {
        let messageArray = message.content.split(" ");
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`<a:WolfyClose2:738050317580632206> Hékás! Ehhez nincs jogod! (Szükséges jog: **Kick**)`);
            console.log(`${message.author.username} használta a ban parancsot, szerver neve: ${message.guild.name}, idő: ${message.createdAt}, csatorna neve: ${message.channel.name}!`); 
            let toBan
            try{
                toBan = message.mentions.members.first() || await bot.users.fetch(message) 
            }catch{
                return message.channel.send(`<a:WolfyClose2:738050317580632206> Mindenhol kerestem, még a szekrényben is, de nem találok ilyen nevű felhasználót: **${message}** `);
            }
            let reason = message.content
            .split(' ')
            .slice(2)
            .join(' ');
            if (!reason) {
                reason = 'Nincs indok megadva.';
            }
            if (!message) return message.channel.send(`<a:WolfyClose2:738050317580632206> Nem mondtad kit bannoljak. Így nem tudom kit kell! **(ban [@név] [indok])**`);
            if(!reason) return message.channel.send(`<a:WolfyClose2:738050317580632206> Oktalanul nem tudok bannolni... Adj meg egy okot! **(ban [@név] [indok])**`);
        try {
            //toBan.send(`Haver! Mi történt? Kibannoltak a **${message.guild.name}** szerverről. Hogy miért? Itt az ok: **${reason}**`).catch(() => message.channel.send("Ennek a felhasználónak nem tudok privátban üzenni, de azért banoltam!"));
            await message.guild.members.ban(toBan, { reason: `Banolva ${message.author.username} által, indok: ${reason}`})
            let x = new MessageEmbed()
            .setColor("RED")
            .setTitle("🔨A BanHammer Lesújtott!🔨")
            .setThumbnail("https://i.imgur.com/l5AFFhc.gif")
            .setDescription(`<a:WolfyCheck3:738036320311705600> Sikeresen Bannoltam!`)
            .addField(`Őt kellett bannolnom:`, `${toBan}`)
            .addField("Aki akarta, hogy bannoljam:", `${message.author}`)
            .addField("Miért kellett bannolnom:", `${reason}`)
            .setFooter(`Bot-Login | Ban`, 'https://cdn.discordapp.com/avatars/700016360830533713/8b1f734b87e37830956c719a88348560.png')
            .setTimestamp()
            await message.channel.send(x)
        } catch (e) {
            console.log(e);
            message.channel.send(`<a:WolfyClose2:738050317580632206> Hoppá! Úgy látom valami nem jó! A rangomnak adj minden jogot, és húzd fel legfelülre! Ha így sem megy, szólj **WonderCraft#6663**-nak, ő segít neked! 😃`);
        }
    }

    con.query(`SELECT * FROM levelsys WHERE ServerID = '${message.guild.id}' AND UserID ='${message.author.id}'`, async (err, rows) => {
        if(rows.length === 0){
            con.query(`INSERT INTO levelsys (ServerID, UserID) VALUES ('${message.guild.id}', '${message.author.id}')`)
            console.log(`${bot.user.tag} Joinolt a ${message.guild.name} Szerverhez (DATABASE UPDATE LEVELSYS)`)
            //Lipystop99.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)
            return;
        }
        const levelInfo = {
            level: rows[0].Level,
            xp: rows[0].XP,
            totalXp: rows[0].TotalXP,
        } 
        const generatedXp = Math.floor(Math.random() * 16);
        levelInfo.xp = Number(levelInfo.xp) + Number(generatedXp);
        levelInfo.totalXp = Number(levelInfo.totalXp) + Number(generatedXp);

        if (levelInfo.xp >= levelInfo.level * 40) {
            levelInfo.level++;
            levelInfo.xp = 0;
            message.channel.send(`💥 Gratulálok ${message.author}! A szinted mostantól **${levelInfo.level}** 💨`);
        }
        con.query(`UPDATE levelsys SET Level = '${levelInfo.level}', XP = '${levelInfo.xp}', TotalXP = '${levelInfo.totalXp}' WHERE ServerID = '${message.guild.id}' AND UserID = '${message.author.id}';`)

    })

    const guild = message.guild;
    con.query(`SELECT * FROM prefixes WHERE ServerID = '${message.guild.id}'`, async (err, rows) => {
        if(message.content.startsWith(`##resetprefix`)){
            con.query(`UPDATE prefixes SET prefix='##' WHERE ServerID = ${message.guild.id}`)
            con.query(`SELECT * FROM prefixes WHERE ServerID = ${message.guild.id}`, (err, rows) => {
              let newprefix = new MessageEmbed()
              .setColor('RANDOM')
              .setDescription('**✅ Sikeresen megváltoztattad a prefixet: ``' + "##" + '``✅**')
              .setFooter(`Prefixet beállította: ${message.author.tag}`)
              message.channel.send({embed: newprefix})
            })
          }   
        // if (await message.content.startsWith('https://')) {
        //     message.delete()
        //     return message.channel.send('no links please')
        // }
        if(err) throw err;
        if(rows.length === 0){
            var str_replace = require('str_replace');
            let sname = guild.name
            let sname2 = str_replace(`'`,``,`${sname}`);
            let sname3 = str_replace(`"`,``,`${sname2}`)
            let sname4 = str_replace('`','',sname3);
            con.query(`INSERT INTO prefixes (ServerName, ServerID, prefix) VALUES ('${sname4}', '${guild.id}', '/')`)
            console.log(`${bot.user.tag} Joinolt a ${message.guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)
            //Lipystop.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)
        }
        const prefix = rows[0].prefix || '##'
        //const prefix = '##'

        if (message.author.bot) return;
        if (!message.content.toLowerCase().startsWith(prefix)) return;

        if(!message.member) message.member = await message.guild.fetchMember(message);
        if(!message.guild) return;
        const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedprefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedprefix.length).trim().split(/ +/);
        const cmdr = args.shift().toLowerCase();

        if (cmdr.length === 0) return;
        
        const command =
            bot.commands.get(cmdr) ||
            bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdr));
        if (!command) return;
        
        if (command) {
            if(command.timeout){
                if(Timeout.has(`${message.author.id}${command.name}`)) {
                    return message.reply(`You can only use this command every ${ms(command.timeout)}!`)
                }else{
                    
                    command.run(bot, message, args);
                    Timeout.add(`${message.author.id}${command.name}`)
                    setTimeout(() => {
                        Timeout.delete(`${message.author.id}${command.name}`)
                    }, command.timeout);
                }
            }else{
                command.run(bot,message,args)
            }

        }
    })
}
