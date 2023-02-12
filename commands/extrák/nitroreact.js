module.exports = {
    name: "nitroreact",
    category: "extrák",
    run: async (client, message, args) => {
        if(!args[0]){
            message.channel.send("Kérlek adj meg egy üzenet ID-t!");
            return;
        }
        if(!args[1]){
            message.channel.send("Kérlek add meg a csatornát ahol az üzenet található!");
            return;
        }
        if(!message.mentions.channels.first()){
            message.channel.send("Kérlek add meg a csatornát ahol az üzenet található!");
            return; 
        }
        if(!args[2]){
            message.channel.send("Kérlek adj meg egy emoji nevet amivel reagáljak!");
            return;
        }
        //const channel = message.mentions.channels.first();
        //const messager = channel.messages.cache;
        console.log(client.channels.cache.get('770906064375906305'));
        return;
        const emoji = message.guild.emojis.cache.get(args[2]);
        if(messager === undefined){
            message.channel.send("Nem találom ezt az üzenetet!")
            return;
        }
        if(emoji === undefined){
            message.channel.send("Nem találom ezt az emojit!")
            return;
        }
        try{
            messager.react(emoji);
            message.channel.send("Sikeresen reagáltam az üzenetre!");
            return;
        }catch (err){
            console.log(err);
            message.channel.send("Ismeretlen hiba miatt nem sikerült reagálnom az üzenetre!");
            return;
        }
    }
}