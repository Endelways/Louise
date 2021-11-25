module.exports = async (bot, msg, cmd, args) => {
    let obj = `${msg.guild.id} : ${msg.member.id} : ${cmd.info.name}`;
    if(!bot.cooldowns.has(obj))
    {
        if(msg.member.id != bot.author || cmd.info.cooldown < 1)
        {
            bot.cooldowns.add(obj);
            bot.timers.set(obj, setTimeout(() => {
                bot.cooldowns.delete(obj)
            }, cmd.info.cooldown));
        }
        cmd.run(bot, msg, args);
    }
    else 
    {
        let time = getTimeLeft(bot.timers.get(obj));
        msg.reply(`plese wait, command in cooldown, elapsed time: ${timeText(time)}`)
        .then(msg => { setTimeout(() => msg.delete(), 5000) })
    }
}

function timeText(time) {
    console.log(time);
    let hours = Number.parseInt(time / 3600, 10);
    let mins = Number.parseInt(((time - (hours * 3600)) / 60), 10);
    let secs = Number.parseInt(time - (hours * 3600)- (mins * 60), 10);
    let textTime = `${hours} hours ${mins} mins ${secs} secs`;
    console.log(textTime);
    return textTime;
}

function getTimeLeft(timeout){
    return Math.ceil((timeout._idleStart + timeout._idleTimeout)/1000 - process.uptime());
}