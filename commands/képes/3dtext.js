module.exports = {
    name: "3dtext",
    category: "képes",
    run: async (client, message, args) => {
        const first = message.author.displayAvatarURL();
        const done = first.replace("webp", "jpg");
        const text = args.join(" ");
        const text2 = text.replace(/ /g, "+");
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?script=3d-logo&text=${text2}&_loc=generate&imageoutput=true`;
        await message.channel.send(url);
    }
}