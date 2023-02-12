const { MessageEmbed } = require("discord.js");
const filterLevels = {
	DISABLED: 'Ki',
	MEMBERS_WITHOUT_ROLES: 'Nincs rang',
	ALL_MEMBERS: 'Mindenki'
};
const moment = require('moment');

const verificationLevels = {
	NONE: 'Nincs',
	LOW: 'Alacsony',
	MEDIUM: 'Közepes',
	HIGH: 'Magas',
	VERY_HIGH: 'Nagyon magas'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Európai',
	hongkong: 'Hong Kongi',
	india: 'Indiai',
	japan: 'Jappáni',
	russia: 'Oroszországi',
	singapore: 'Singaporei',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};
module.exports = {
    name: "serverinfo",
    aliases: ["si", "serveri", "sinfo", "server", "guild", "guildinfo"],
	description: "Kiír információkat a szerverről.",
	category: "információs",
    run: async (client, message, args) => {
        message.delete();
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`** __${message.guild.name}__ információi**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Általános', [
				`**❯ Név:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				//`**❯ Tulajdonos:** ${message.guild.owner.username} (${message.guild.ownerID})`,
				`**❯ Régió:** ${regions[message.guild.region]}`,
				`**❯ Boost szintje:** ${message.guild.premiumTier ? `${message.guild.premiumTier}. szint` : 'None'}`,
				`**❯ Tartalomszűrés:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Ellenőrzési szint:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Létrehozva:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Statisztikák', [
				`**❯ Rangok:** ${roles.length}`,
				`**❯ Emojik:** ${emojis.size}`,
				`**❯ Nem Animált Emojik:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Animált Emojik:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Tagok száma:** ${message.guild.memberCount}`,
				`**❯ Emberek:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Botok:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Szövegcsatornák:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Hangcsatornák:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Boostok száma:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Állapot', [
				`**❯ Elérhető:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Tétlen:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Elfoglalt:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Láthatatlan:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
			//.addField(`Rangok [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			.setTimestamp();
		message.channel.send(embed);
    }
}