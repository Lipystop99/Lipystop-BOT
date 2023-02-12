module.exports = client => {
  let botStatus = [
    `${client.guilds.cache.size} szerveren`,
    "/cmds",
    `Több mint ${client.users.cache.size} felhasználó!`,
    `Jelenleg 0.1.0-ás verzió!`
]

    setInterval(function() {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

    client.user.setStatus("online"); // sets the bots status
    
  console.log(`${client.user.username} online!`);
};
