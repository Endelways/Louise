const { ButtonInteraction } = require('discord.js');
const Ds = require('discord.js');

module.exports.run = async (bot, db, msg, args) => {
    let guildDB = await require('../../Database/Handlers/getGuildData')(bot.db, msg.guild);
    if(args.length == 0)
    {
        let str = "";
        let emb = new Ds.MessageEmbed()
        .setTitle(`Кофигурация для ${msg.guild.name}!`)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setColor("#2f3136")
        .setThumbnail("https://a.radikal.ru/a15/2107/8e/0861fcccf12c.png")
        .setDescription(`This embed display all guild settings, for change this use ${guildDB.prefix}config {settingName} {newValue}`)
        
        for(const [val, key] of Object.entries(guildDB[0]))
        {   
            if(val != "id")
            {
                str += `**${val}** - ` + '``' + `${key}` + '``\n';
            }
        }
        emb.addField('\u200b', str)
        msg.channel.send({ embeds:[emb]});
        
    }
    if(args.length == 2)
    {
        if(guildDB[0][args[0]])
        {
            await bot.db.execute(`Update guilds Set ${args[0]} = '${args[1]}' WHERE id = ${msg.guild.id}`);
            let emb = new Ds.MessageEmbed()
            .setTitle(`Новая кофигурация для ${msg.guild.name}!`)
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())
            .setColor("#2f3136")
            .setThumbnail("https://a.radikal.ru/a15/2107/8e/0861fcccf12c.png")
            emb.addField('\u200b', `**${args[0]}** - ` + '``' + `${args[1]}` + '``')
            msg.channel.send({ embeds:[emb]});
        }
    }
    // let guildDB = await require('../../Database/Handlers/getGuildData')(msg.guild);
    // if(args.length == 0)
    // {
    //     let str = "";
    //     let emb = new Ds.MessageEmbed()
    //     .setTitle(`Кофигурация для ${msg.guild.name}!`)
    //     .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    //     .setColor("#2f3136")
    //     .setThumbnail("https://a.radikal.ru/a15/2107/8e/0861fcccf12c.png")
    //     .setDescription(`This embed display all guild settings, for change this use ${guildDB.prefix}config {settingName} {newValue}`)
        
    //     for(const [val, key] of Object.entries(guildDB._doc))
    //     {   
    //         if(val != "_id")
    //         {
    //             str += `**${val}** - ` + '``' + `${key}` + '``\n';
    //         }
    //     }
    //     emb.addField('\u200b', str)
    //     msg.channel.send({ embeds:[emb]});
        
    // }
    // else if(args.length == 2)
    // {
    //     if(guildDB[args[0]])
    //     {
    //         guildDB[args[0]] = args[1];
    //         guildDB.save();
    //         let emb = new Ds.MessageEmbed()
    //         .setTitle(`Новая кофигурация для ${msg.guild.name}!`)
    //         .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    //         .setColor("#2f3136")
    //         .setThumbnail("https://a.radikal.ru/a15/2107/8e/0861fcccf12c.png")
    //         emb.addField('\u200b', `**${args[0]}** - ` + '``' + `${args[1]}` + '``')
    //         msg.channel.send({ embeds:[emb]});
    //     }
    // }
    // else {
    //     msg.channel.send(`Wrong arguments, try ${guildDB.prefix}config for displayed current setting or ${guildDB.prefix}config {settingName} {newValue} for change setting`);
    // }
}
module.exports.info = {
    name: "guild",
    description:"",
    rateLimit: 3,
    cooldown: 2e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : [],
    enabled : true
}