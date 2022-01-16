const Ds = require('discord.js');

module.exports.run = async (bot, db, msg, args) => {
    const db_member = await require('../../Database/Handlers/getMember')(bot.db, msg.member); 
    let action = {};
    const btn_fisher = {
        type: 'BUTTON',
        label:'Устроиться рыбаком',
        customId:'fisher',
        style:'PRIMARY',
        // enoji:'',
        // url: null,
        // disabled : false
    }
    const btn_hunter = {
        type: 'BUTTON',
        label:'Устроиться охотником',
        customId:'hunter',
        style:'PRIMARY',
    }
    const btn_teacher = {
        type: 'BUTTON',
        label:'Устроиться учителем',
        customId:'teacher',
        style:'PRIMARY',
    }

    const btn_quit= {
        type: 'BUTTON',
        label:'Уволоиться с текущей работы ',
        customId:'quit',
        style:'SECONDARY',
    }
    
    if(db_member[0]['job'] != null)
    {
        action = {
            type : 'ACTION_ROW',
            components:[btn_quit]
        }        
    }
    else
    {
        action = {
            type : 'ACTION_ROW',
            components:[btn_fisher, btn_hunter, btn_teacher]
        }  
    }

    let emb = new Ds.MessageEmbed()
        .setTitle(`В данный момент на сервере ${msg.guild.name} есть такие вакансии: `)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setColor("#2f3136")
        .setDescription(`**Рыболов\nОхотник\nУчитель**`)
    const botMsg = await msg.channel.send({ embeds:[emb], components:[action]});

    const collector = await botMsg.createMessageComponentCollector();
    
    collector.on('collect', async Interaction => {
        if(Interaction.user.id == msg.member.id)
        {
            switch(Interaction.customId){
                case 'fisher':
                    botMsg.edit({components:[]});
                    await bot.db.execute(`Update members Set job = '${Interaction.customId}' WHERE id = ${msg.member.id} AND guild_id = ${msg.guild.id}`);
                    msg.reply("Вы успешно устроились на работу: **Рыбак**");
                    break;
                case 'hunter':
                    botMsg.edit({components:[]});
                    await bot.db.execute(`Update members Set job = '${Interaction.customId}' WHERE id = ${msg.member.id} AND guild_id = ${msg.guild.id}`);
                    msg.reply("Вы успешно устроились на работу: **Охотник**");
                    break;
                case 'teacher':
                    botMsg.edit({components:[]});
                    await bot.db.execute(`Update members Set job = '${Interaction.customId}' WHERE id = ${msg.member.id} AND guild_id = ${msg.guild.id}`);
                    msg.reply("Вы успешно устроились на работу: **Учитель**");
                    break;
                case 'quit':
                    botMsg.edit({components:[]});
                    await bot.db.execute(`Update members Set job = NULL WHERE id = ${msg.member.id} AND guild_id = ${msg.guild.id}`);
                    msg.reply("Вы успешно стали **безработным**");
                    break;
            }
                
            
        }
    })
}

module.exports.info = {
    name: "jobs",
    description:"get actualy jobs",
    rateLimit: 3,
    cooldown: 3e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : [""],
    enabled : true
}