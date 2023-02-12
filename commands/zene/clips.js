const { LOCALE } = require("../../core/musiccore");
const i18n = require("i18n");
const fs = require("fs");

i18n.setLocale(LOCALE);

module.exports = {
  name: "clips",
  category: "zene",
  description: i18n.__('clips.description'),
  run: (client, message, args) => {
    fs.readdir("./sounds", function(err, files) {
      if (err) return console.log("Unable to read directory: " + err);

      let clips = [];

      files.forEach(function(file) {
        clips.push(file.substring(0, file.length - 4));
      });

      message.reply(`${clips.join(" ")}`).catch(console.error);
    });
  }
};
