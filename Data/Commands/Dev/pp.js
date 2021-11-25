module.exports.run = async (bot, msg, args) => {
	await msg.channel.send('Hello my dear friend ' + msg.author.username);
}

module.exports.info = {
    name: "hi",
    description:"hi with bot",
    rateLimit: 3,
    cooldown: 2e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : [],
    enable : true
}