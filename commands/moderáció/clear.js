const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clear",
    category: 'moderáció',
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
            return message.channel.send(
                `Nincs jogod ehhez, ${message.author.username}` // returns this message to user with no perms
            );
        if (!args[0]) {
            return message.channel.send(`Írj be egy mennyiséget 1 és 100 között!`)
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100 ) {
            deleteAmount = 100+1;
        } else {
            deleteAmount = parseInt(args[0]) + 1;
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`Sikeresen töröltem ${deleteAmount - 1} üzenetet!`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#f2f2f2')
        const asd = await message.channel.send(embed)
        asd.delete({timeout: 5000})
        
    }
}