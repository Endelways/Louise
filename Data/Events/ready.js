const Ds = require('discord.js'),
loadCommands = require('../Handlers/CommandInit');

module.exports = async (Client) => {
    console.log("Bot has been authorized");
    loadCommands(Client, "\\Data\\Commands");
    Client.db = await require("../Database/config");
}
