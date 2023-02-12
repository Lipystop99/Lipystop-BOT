const axios = require('axios');
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs")
module.exports = {
    name: "blur",
    category: "képes",
    run: async (client, message, args) => {
      const done = message.author.displayAvatarURL({ format: "png", size: 1024 });
      message.channel.send(done)
      const response = await axios.post('https://apis.duncte123.me/filters/blur', {image: done}, { headers: { 'User-Agent': 'Wolfy#5206', 'Authorization': 'Wolfy#5206'} })
      console.log(response.data)
      fs.writeFile('images/test.jpeg', response.data, 'base64', function(err){});
      message.channel.send("ASD", image)
    }
}