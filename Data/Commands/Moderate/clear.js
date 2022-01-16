const Discord = require(`discord.js`)

module.exports.run = async (bot, db, msg, args) => {
    if(args[0] == `all`)
    {
        clearChannel(msg.channel);
    }
    else
    {    
        let del = Number(args[0]); // число
        if (!del || isNaN(args[0]) || parseInt(args[0]) <= 0) { return msg.reply(`Please put a number (1-99)`) }
        else
        {
            if(del < 1) return msg.reply(`Please put a number (1-99)`)
            else if(del > 100) return msg.reply(`УPlease put a number (1-99)`)

            msg.delete();
            msg.channel.bulkDelete(del, true)
            .then(deleted => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Уборщик :wastebasket:`)
                    .setDescription(`Удалено __**${deleted.size}**__ сообщений`)
                    .setColor(`#FDFEFE`)
                    .setImage(`https://i.gifer.com/3B2w.gif`)
                msg.channel.send({ embeds:[embed]})
                .then(msg => {        
                            setTimeout(() => {
                                if(!msg.deleted)
                                msg.delete();
                            }, 5000);
                });
            });
        }
    }
}

async function clearChannel(channel)
{
    let newch = channel.clone();
    channel.delete();
    //newch.guild.channels.create(newch.name, newch);
}

module.exports.info = {
    name: `clear`,
    description:`Delete <num> messages`,
    rateLimit: 3,
    cooldown: 3e4,
    ownerOnly : false,
    userPerms : ["MANAGE_MESSAGES"],
    clientPerms : ["SEND_MESSAGES","MANAGE_MESSAGES"],
    aliases : ["clean"],
    enabled : true
}