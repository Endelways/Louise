const Ds = require('discord.js'),
loadCommands = require('../Handlers/CommandInit');

module.exports = (Client) => {
    console.log("Bot has been authorized");
    loadCommands(Client, "./Data/Commands");
    require("../Database/config").Connect();
}
