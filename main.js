const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true,
    intents: []
});
const config = require("./botconfig.json");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const token = config.TOKEN;
const database = require("./core/dbcore.js")
client.database = database;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
const mysql = require("mysql2");
client.snipes = new Map()
const path = require("path");
const i18n = require("i18n");
client.queue = new Map();
const cooldowns = new Discord.Collection();
i18n.configure({
  locales: ["en", "hu", "es", "ko", "fr", "tr", "pt_br", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "hu",
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});

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
  console.log('Adatbazisra csatlakozva! - Main');
});
const databasecon = new client.database()
databasecon.dbopen();

client.on("warn", (info) => console.log(info));

client.on("error", console.error);

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
  });
 
  client.on('guildMemberAdd', async member => {
    require("./events/guild/memberAdd")(member)
  })
  
  client.on('guildMemberRemove', async (message) => {
    require("./events/guild/memberRemove")(message)
  })



client.on("message", async (message) =>{
  if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  let guild = message.guild;
  con.query(`SELECT * FROM prefixes WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;
    if(rows.length === 0){
      var str_replace = require('str_replace');
      let sname = guild.name
      let sname2 = str_replace(`'`,``,`${sname}`);
      let sname3 = str_replace(`"`,``,`${sname2}`)
      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO prefixes (ServerName, ServerID, Prefix) VALUES ('${sname4}', '${guild.id}', '/')`)

      console.log(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

      //theprime.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

    }
    if(rows[0] === undefined){
      return;
    }

    const prefix = rows[0].Prefix || '/'

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    client.prefix = matchedPrefix;
  });
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(user === client.user) return;
  if(reaction.message.content.includes('szintkártyája')){
    const name = reaction.message.content.replace(" szintkártyája", "");
    const name2 = name.replace("**", "");
    const name3 = name2.replace("**", "");
    const userID = client.users.cache.find(u => u.tag === name3).id
      if(reaction.emoji.name == '📜'){
        con.query(`SELECT * FROM levelsys WHERE ServerID = '${reaction.message.guild.id}' AND UserID ='${userID}'`, async (err, rows) => {
          const data = {
            level: rows[0].Level,
            xp: rows[0].XP,
            totalXp: rows[0].TotalXP
          }
          const remain = Number(data.level * 40) - Number(data.xp);
          reaction.message.delete();
          reaction.message.channel.send(`**${name3}** \n**Szint:** ${data.level} \n
          **XP:** ${data.xp} / ${data.level * 40} \n
          (Még ${remain} XP kell szintlépéshez.)`)
        })
      }
       
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
  con.query(`SELECT * FROM ticketsys WHERE ServerID = ${reaction.message.guild.id}`, async (err, rows) => {
    if(!rows[0]){
      var str_replace = require('str_replace');
      let sname = reaction.message.guild.name
      let sname2 = str_replace(`'`,``,`${sname}`);
      let sname3 = str_replace(`"`,``,`${sname2}`)
      let sname4 = str_replace('`','',sname3);
      con.query(`INSERT INTO ticketsys (ServerName, ServerID, Status) VALUES 
      ('${sname4}', '${message.guild.id}', 'off')`)
      return;
    }
    const admins = reaction.message.guild.members.cache.find(members => members.hasPermission('ADMINISTRATOR' || 'MANAGE_MESSAGES') === true);
    const tickcount = rows[0].TicketCount;
    if(user === client.user) return;
    if(reaction.message.id === rows[0].MessageID){
        if(reaction.emoji.name == '🎟️'){
            reaction.users.remove(user);
            const cCreaTick = reaction.message.guild.channels.create(`ticket-${tickcount}`, {
                type: 'text',
                permissionOverwrites: [
                    {
                        allow: 'VIEW_CHANNEL',
                        id: user.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: reaction.message.guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: admins.id
                    }

                ]
            });
            const cTiMsG = new Discord.MessageEmbed()
            .setTitle('Ticket')
            .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
            .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
            .setTimestamp()
            .setColor(0xFF8C00)
            .setDescription(`Üdvözlünk!\nÍrd le a problémád! Egy csapattag hamarosan felveszi veled a kapcsolatot.\nA 🔒-ra kattintva zárhatod a ticketet.`);
            (await cCreaTick).send(`${user}`);
            const snds = (await cCreaTick).send(cTiMsG);
            (await snds).react('🔒');
        }
    }
    if(reaction.message.embeds[0].description === 'Üdvözlünk!\nÍrd le a problémád! Egy csapattag hamarosan felveszi veled a kapcsolatot.\nA 🔒-ra kattintva zárhatod a ticketet.'){
        if(reaction.emoji.name == '🔒'){
            reaction.users.remove(user);
            reaction.message.react('✅');
            reaction.message.react('❌');
        }
        if(reaction.emoji.name == '✅'){
            reaction.message.channel.setName(`closed-${tickcount}`)
            reaction.message.reactions.removeAll();
            reaction.message.react('🔒');
            const StoEm = new Discord.MessageEmbed()
            .setTitle('Ticket')
            .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
            .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
            .setTimestamp()
            .setColor(0xFF8C00)
            .setDescription(`Ticket bezárva. Ticket törléséhez használd a ⛔ reakciót, a ticket újranyitásához pedig a 🔓 jelet.`);
            const sendiR = reaction.message.channel.send(StoEm);
            (await sendiR).react('⛔');
            (await sendiR).react('🔓');
        }
        if(reaction.emoji.name == '❌'){
            reaction.message.reactions.removeAll();
            reaction.message.react('🔒');
        }
    }
    if(reaction.message.embeds[0].description === 'Ticket bezárva. Ticket törléséhez használd a ⛔ reakciót, a ticket újranyitásához pedig a 🔓 jelet.'){
        if(reaction.emoji.name == '⛔'){
            reaction.users.remove(user);
            const StoEm = new Discord.MessageEmbed()
            .setTitle('Ticket')
            .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
            .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
            .setTimestamp()
            .setColor(0xFF8C00)
            .setDescription(`⛔ Ticket törlésre kerül **10 másodperc** múlva. ⛔`);
            const lol1o = reaction.message.channel.send(StoEm);
            setTimeout(() => {
                reaction.message.channel.delete("Ticket zárva.");
            }, 10000);
        }
        if(reaction.emoji.name == '🔓'){
            reaction.users.remove(user);
            const StoEm = new Discord.MessageEmbed()
            .setTitle('Ticket')
            .setAuthor(client.user.username, 'https://cdn.discordapp.com/attachments/739460060513566764/765903767643095060/ticket-icon-tickets-vector-icon-11553402726yo5rdbdzzc.png')
            .setFooter(`${client.user.tag} | Ticket`, client.user.displayAvatarURL)
            .setTimestamp()
            .setColor(0xFF8C00)
            .setDescription(`🔓 Ticket újranyitva ${user} által. 🔓`);
            reaction.message.channel.send(StoEm);
            reaction.message.channel.setName(`ticket-${tickcount}`)
        }
    }
  })
});





client.on("message", async (message) =>{
  if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  let guild = message.guild;
  con.query(`SELECT * FROM autoroles WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;
    if(rows.length === 0){
      var str_replace = require('str_replace');
      let sname = guild.name
      let sname2 = str_replace(`'`,``,`${sname}`);
      let sname3 = str_replace(`"`,``,`${sname2}`)
      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO autoroles (ServerName, ServerID, AutoRoleStatus) VALUES ('${sname4}', '${guild.id}', 'ki')`)

      console.log(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE AUTOROLE)`)

      //theprime.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

    }
    if(rows[0] === undefined){
      return;
    }

  });
});
client.on("message", async (message) =>{
    if(message.channel.type === 'dm') return;
    if(message.author === client.user) return;
    let guild = message.guild;
    con.query(`SELECT * FROM suggestionsys WHERE ServerID = '${guild.id}'`, (err, rows) => {
  
      if(err) throw err;
      if(rows.length === 0){
        var str_replace = require('str_replace');
        let sname = guild.name
        let sname2 = str_replace(`'`,``,`${sname}`);
        let sname3 = str_replace(`"`,``,`${sname2}`)
        let sname4 = str_replace('`','',sname3);
  
        con.query(`INSERT INTO suggestionsys (ServerName, ServerID, Status) VALUES ('${sname4}', '${guild.id}', 'off')`)
  
        console.log(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE SUGGEST)`)
  
        //theprime.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)
  
      }
      if(rows[0] === undefined){
        return;
      }
  
    });
});

client.on("message", async (message) =>{
  if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  let guild = message.guild;
  con.query(`SELECT * FROM welcomes WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;
    if(rows.length === 0){
      var str_replace = require('str_replace');
      let sname = guild.name
      let sname2 = str_replace(`'`,``,`${sname}`);
      let sname3 = str_replace(`"`,``,`${sname2}`)
      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO welcomes (ServerName, ServerID, WelcomeStatus, WelcomeInvStatus, WelcomeImgStatus) VALUES ('${sname4}', '${guild.id}', 'ki', 'ki', 'ki')`)

      console.log(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE WELCOMES)`)

      //theprime.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

    }
    if(rows[0] === undefined){
      return;
    }

  });
});
client.on('guildCreate', async (guild) =>{

  var str_replace = require('str_replace');

  con.query(`SELECT * FROM prefixes WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;

    if(rows.length === 0){

      let sname = guild.name

      let sname2 = str_replace(`'`,``,`${sname}`);

      let sname3 = str_replace(`"`,``,`${sname2}`)

      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO prefixes (ServerName, ServerID, Prefix) VALUES ('${sname4}', '${guild.id}', '/')`)

      console.log(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

      //theprime.send(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)

    }

  })

});





client.on('guildCreate', async (guild) =>{

  var str_replace = require('str_replace');

  con.query(`SELECT * FROM welcomes WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;

    if(rows.length === 0){

      let sname = guild.name

      let sname2 = str_replace(`'`,``,`${sname}`);

      let sname3 = str_replace(`"`,``,`${sname2}`)

      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO welcomes (ServerName, ServerID) VALUES ('${sname4}', '${guild.id}')`)

      console.log(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE WELCOME)`)

      //theprime.send(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE WELCOME)`)

    }

  })

  guild.channels.cache.first().createInvite().then(inv => console.log(`${guild.name} | ${inv.url}`));

  //guild.channels.cache.first().createInvite().then(inv => theprime.send(`${guild.name} | ${inv.url}`));

});



client.on('guildCreate', async (guild) =>{

  var str_replace = require('str_replace');

  con.query(`SELECT * FROM autoroles WHERE ServerID = '${guild.id}'`, (err, rows) => {

    if(err) throw err;

    if(rows.length === 0){

      let sname = guild.name

      let sname2 = str_replace(`'`,``,`${sname}`);

      let sname3 = str_replace(`"`,``,`${sname2}`)

      let sname4 = str_replace('`','',sname3);

      con.query(`INSERT INTO autoroles (ServerName, ServerID) VALUES ('${sname4}', '${guild.id}')`)

      console.log(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE AUTOROLE)`)

      //theprime.send(`${client.user.tag} Csatlakozott a ${guild.name} Szerverhez (DATABASE UPDATE AUTOROLE)`)

    }

  })

});
process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});



client.login("MTA2OTI0MTEyMzkyODgwNTUwOQ.Gb4BUD.K6D2EhGN5X06NalLS_m5SigsLlmvG4BWBY8rlo");
//client.login(token);
