module.exports = {
    name: "gay",
    category: "képes",
    run: async (client, message, args) => {
        if(!message.mentions.users.first()){
            const first = message.author.displayAvatarURL();
            const done = first.replace("webp", "jpg");
            const url = `https://some-random-api.ml/canvas/gay?avatar=${done}`;
            await message.channel.send(url);
            return;
        }
        const first2 = message.mentions.users.first().displayAvatarURL();
        const done2 = first2.replace("webp", "jpg");
        const url2 = `https://some-random-api.ml/canvas/gay?avatar=${done2}`;
        await message.channel.send(url2);
    }
}