module.exports = {
    name: "ytcomment",
    category: "képes",
    run: async (client, message, args) => {
        const first = message.author.displayAvatarURL();
        const done = first.replace("webp", "jpg");
        const text = args.join(" ");
        const text2 = text.replace(/ /g, "%20");
        const url = `https://some-random-api.ml/canvas/youtube-comment?avatar=${done}&comment=${text2}&username=${message.author.username}`;
        await message.channel.send(url);
    }
}