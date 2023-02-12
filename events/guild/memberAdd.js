// this is where you add your stuff for when a users joins
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
    console.log('Adatbazisra csatlakozva! - WelcomeEvents');
});
module.exports = async (member) => {
  con.query(`SELECT * FROM welcomes WHERE Serverid = ?`, [member.guild.id] , async (err, rows) => {
    try{
      const welcomembed = new Discord.MessageEmbed
      const cachedInvites = guildinvs.get(member.guild.id);
      const newInvites = await member.guild.fetchInvites();
      guildinvs.set(member.guild.id, newInvites);
      const usedInvite = newInvites.find(
        (inv) => cachedInvites.get(inv.code).uses < inv.uses
      );
      var userId = usedInvite.inviter.id;
      const inviter = usedInvite.inviter.username;
      var userInvites = member.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === userId));
      var useamount = (await userInvites).uses + 1;
      function replacer(string) {
        return string
          .replace("{member}", member)
          .replace("{guild}", member.guild.name)
          .replace("{inviter}", inviter)
          .replace("{useamount}", useamount);
      }
      function replacert(string) {
        return string
          .replace("{member}", member.user.username)
          .replace("{guild}", member.guild.name)
          .replace("{inviter}", inviter)
          .replace("{useamount}", useamount);
      }
      const status = rows[0].WelcomeStatus;
      const canvstatus = rows[0].WelcomeImgStatus;
      const img = rows[0].WelcomeImgUrl;
      const channel = rows[0].WelcomeChannelID;
      const deftitle = rows[0].WelcomeTitle;
      const defdescription = rows[0].WelcomeDescription;
      const title = replacert(deftitle);
      const description = replacer(defdescription);
      const ch =  member.guild.channels.cache.get(channel);
      if(status == "ki") return;
      if(status == "be"){
          const welcomembed = new Discord.MessageEmbed();
          welcomembed.setTitle(title)
          .setColor('RANDOM')
          .setFooter('Bot-Login | Welcome', client.user.displayAvatarURL)
          .setTimestamp()
          .setDescription(description);
          ch.send(welcomembed);/**
          if(canvstatus === 'ki') return;
          if(canvstatus === 'be'){
            let data = await canva.welcome(member, { link: `${img}` })

            const attachment = new Discord.MessageAttachment(
              data,
              "welcome-image.png"
            );
            ch.send(attachment);
          }*/
      }
    }catch(error){
      const channel = rows[0].WelcomeChannelID;
      console.error(error);
      member.guild.owner.user.send(`Hiba lépett fel az üdvözlő üzenet elküldésekor. Ellenőrizd, hogy a bot rangja a legmagasabban van e. Szerver: ${member.guild.name} Csatorna: <@$${channel}>`).catch(console.error);
    }
  });
};

