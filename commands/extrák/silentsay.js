const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "silentsay",
    category: "extrák",
    run: async (client, message, args) => {
        message.delete();
        const dmpers = message.mentions.users.first();
        if(!args){
            message.author.send('Tesó, nem mondtad kinek súgjak meg és mit!')
            return;
        }
        if(!dmpers){
            message.author.send('Tesó, nem mondtad kinek súgjak meg valamit!')
            return;
        }
        if(!args[1]){
            message.author.send(`Tesó, nem mondtad meg, mit súgjak meg ${dmpers} felhasználónak!`)
        }
        dmpers.send(`Psszt! Hé, ${dmpers.username}, ${message.author.username} ezt üzeni neked: ${args.join(" ")}`)
        message.author.send(`Megüzentem ${dmpers.username} felhasználónak, amit mondtál! :))`)
    }
}