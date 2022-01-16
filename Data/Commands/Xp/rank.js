module.exports.run = async (bot, db, msg, args) => {
    const guild = await require("../../Database/Handlers/getGuildData")(bot.db, msg.guild);
    const member = await require("../../Database/Handlers/getMember")(bot.db, msg.member);
    const clan = await require("../../Database/Handlers/getClan")(bot.db, member);
    require('../../Handlers/Image/rank')(msg, `../../Data/img/background.png`, member, msg.member, guild, clan);
}

module.exports.info = {
    name: "rank",
    description:"get user profile",
    rateLimit: 3,
    cooldown: 3e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : ["profile", "user", "xp"],
    enabled : true
}