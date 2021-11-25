module.exports = async (bot, msg, cmd, args) => {
    let botMember = await msg.guild.members.fetch(bot.user.id);
    if(botMember.permissions.has(cmd.info.clientPerms))
    {
        if(msg.member.permissions.has(cmd.info.userPerms))
        {
            require('./cooldown')(bot, msg, cmd, args);
        }
        else
        {
            msg.reply(`You need special permissions: ${cmd.info.userPerms}`)
            .then(msg => { msg.delete({ timeout: 5000 })})
        }
    }
    else
    {
        msg.reply(`Bot need special permissions: ${cmd.info.clientPerms}`)
        .then(msg => { msg.delete({ timeout: 5000 })})
    }
}