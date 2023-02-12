const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");
const { join } = require("path");
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
    console.log('Adatbazisra csatlakozva! - Rank');
});
module.exports = {
    name: "rank",
    category: "rendszerek",
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        con.query(`SELECT * FROM levelsys WHERE ServerID = '${message.guild.id}' AND UserID ='${member.id}'`, async (err, rows) => {
            if(rows.length === 0){
                con.query(`INSERT INTO levelsys (ServerID, UserID) VALUES ('${message.guild.id}', '${member.id}')`)
                console.log(`${client.user.tag} Joinolt a ${message.guild.name} Szerverhez (DATABASE UPDATE LEVELSYS)`)
                Lipystop.send(`${client.user.tag} Joinolt a ${guild.name} Szerverhez (DATABASE UPDATE PREFIX)`)
                return;
            }
            const data = {
                level: rows[0].Level,
                xp: rows[0].XP,
                totalXp: rows[0].TotalXP
            }
            if (!data) return message.reply("Ennek a személynek nincs rankja!")

            const canvas = createCanvas(1000, 333);
            const ctx = canvas.getContext("2d");
            const background = await loadImage(join(__dirname, "..", "..", "img", "canva.png"));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#ffffff";
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = "#000000";
            ctx.fillRect(180, 216, 770, 65);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.strokeRect(180, 216, 770, 65);
            ctx.stroke();

            ctx.fillStyle = "#e67e22";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);

            ctx.textAlign = "left";
            ctx.fillText(member.user.tag, 300, 120);

            ctx.font = "50px Arial";
            ctx.fillText("Szint:", 300, 180);
            ctx.fillText(data.level, 470, 180);

            ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#ffffff"
            ctx.stroke();
            ctx.closePath();
            ctx.clip();
            const avatar = await loadImage(member.user.displayAvatarURL({ format: "jpg" }));
            ctx.drawImage(avatar, 40, 40, 250, 250);

            const attachment = new MessageAttachment(canvas.toBuffer(), "szint.png");
            const sentmsg = await message.channel.send(`**${member.user.tag}** szintkártyája`, attachment);
            sentmsg.react("📜");
        })
    }
}