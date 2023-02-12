const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "embedmsg",
    category: 'moderáció',
    run: async (client, message, args) => {
        message.delete()
        let messageArray = message.content.split(" ");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(`<a:WolfyClose2:738050317580632206> Hékás! Ehhez nincs jogod! (Szükséges jog: **Üzenetek kezelése**)`).then(msg => msg.delete({timeout: 10000}))
            return
        }
        message.channel.send("Kérlek add meg az embed címét! Írd be a chatbe egy üzenetben, prefix és parancsok nélkül.").then(msg => msg.delete({timeout: 10000}))
        let collector = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

            max: 1,

            time: 100000,

            errors: ["time"]

        }).catch((err) => {

            message.channel.send(":x: | Nem válaszoltál 100 másodpercen belül, beküldés megszakítva!").then(msg => msg.delete({timeout: 10000}))
            return false;
        });
        if(collector === false){
            return;
        }

        let answer = collector.first();
        let demoemb = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(answer)
        .setDescription("Ide a leírás kerül.")
        message.channel.send("Az embed eddig így néz ki:").then(msg => msg.delete({timeout: 10000}))
        message.channel.send(demoemb).then(msg => msg.delete({timeout: 10000}))
        message.channel.send("Most add meg kérlek az embed leírását! Írd be a chatbe egy üzenetben, prefix és parancsok nélkül.").then(msg => msg.delete({timeout: 10000}))
        let collector2 = await message.channel.awaitMessages(m => (m.author.id === message.author.id), {

            max: 1,

            time: 100000,

            errors: ["time"]

        }).catch((err) => {

            message.channel.send(":x: | Nem válaszoltál 100 másodpercen belül, beküldés megszakítva!").then(msg => msg.delete({timeout: 10000}))
            return false;
        });
        if(collector2 === false){
            return;
        }

        let answer2 = collector2.first();
        let emb = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(answer)
        .setDescription(answer2)
        message.channel.send("Az embed beállítva! ✅ Az üzenetek miatt ne aggódj, *10 másodperc** és eltűnnek.").then(msg => msg.delete({timeout: 10000}))
        message.channel.send(emb)
    }
}