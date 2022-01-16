require('dotenv').config();

module.exports.run = async (bot, db, msg, args) => {
    if(args.length == 2 && bot.commands.has(args[0]) && (args[1] == 'false' || args[1] == 'true'))
    {
        require('../../Database/Handlers/toggleDisableCommand')(bot.db, msg.guild, args[0], args[1]);
        switch(args[1])
        {

            case 'false':
                msg.reply(`Command ${args[0]} has been deactivated`);
                break; 
            case 'true':
                msg.reply(`Command ${args[0]} has been activated`);
                break;
        }
        
    }
}
module.exports.info = {
    name: "cmd",
    description:"",
    rateLimit: 3,
    cooldown: 2e4,
    ownerOnly : false,
    userPerms : ["ADMINISTRATOR"],
    clientPerms : ["SEND_MESSAGES"],
    aliases : ['dCD'],
    enabled : true,
}