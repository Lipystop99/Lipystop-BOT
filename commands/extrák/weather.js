const api = require('../../botconfig.json');
const api_key = 'ed8f61b0e5ee0f10659b3807ad0d2b6e';
const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: "weather",
    category: "extrák",
    run: async (client, message, args) => {
        if(!args[0]) {
            return message.channel.send(`Kérlek írj be egy várost!`)
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${api_key}`;

        let response, city;
        let idoj;
        
        try {
            response = await axios.get(url);
            city = response.data
        } catch (e) {
            return message.channel.send(`Nem találom azt a várost.`)
        }
        if(city.weather[0].main === 'mist'){
            idoj = 'Köd'
        }
        const embed = new MessageEmbed()
            .setTitle(`Időjárás: ${city.name}`)
            .setThumbnail(`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`)
            .setDescription(city.weather[0].description)
            .addFields(
                {
                    name: "Jelenlegi hőmérséklet: ",
                    value: `${city.main.temp} °C`,
                    inline: true
                },
                {
                    name: "Időjárás: ",
                    value: city.weather[0].main
                },
                {
                    name: "Hőmérséklet: ",
                    value: `${city.main.feels_like} °C`,
                    inline: true
                },
                {
                    name: "Legmagasabb hőmérséklet: ",
                    value: `${city.main.temp_max} °C`,
                    inline: true
                },
                {
                    name: "Legalacsonyabb hőmérséklet: ",
                    value: `${city.main.temp_min} °C`,
                    inline: true
                },
                {
                    name: "Napkelte: ",
                    value: city.sys.sunrise,
                    inline: true
                },
                {
                    name: "Napnyugta: ",
                    value: city.sys.sunset,
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}