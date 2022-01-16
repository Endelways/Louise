const Ds = require('discord.js');

let standard = {
    label : "",
    value: "",
    description: "нажми на меня",
}

let selectMenu = {
    type: 'SELECT_MENU',
    customId:'sellmenu',
    placeholder:'Выберите предмет для продажи',
    minValues: 1,
    maxValues: 1,
    options: [],
    disabled: false
}

module.exports.run = async (bot, db, msg, args) => {
	const [inv, fields] = await bot.db.execute(`SELECT * FROM inventory WHERE member_id = ${msg.member.id} AND guild_id = ${msg.guild.id}`); 
    let str = "";
    let emb = new Ds.MessageEmbed()
    .setTitle(`Инвентарь ${msg.member.displayName}!`)
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor("#2f3136")
    .setDescription(`Тут показаны все имеющиеся предметы`)
    str +=  `**Название** - ` + '``' + `Стоимость` + '``\n';
    for(let i = 0; i < inv.length; i++)
    {
        str += `**${inv[i].item_name}** - ` + '``' + `${inv[i].cost}` + '``\n';
        standard.label = `${inv[i].item_name}-${inv[i].cost}`;
        standard.value = `${inv[i].item_name}_${inv[i].cost}`;
        console.log(standard);
        selectMenu.options.push(Object.assign({}, standard));
    }
    console.log(selectMenu.options);
    const action = {
        type: 'ACTION_ROW',
        components: [selectMenu]
    };
    emb.addField('\u200b', str)
    botMsg = await msg.channel.send({embeds : [emb], components: [action]})

    const collector = await botMsg.createMessageComponentCollector();
    collector.on('collect', async Interaction => {
        if(Interaction.user.id == msg.member.id && Interaction.customId == "sellmenu")
        {
            
        }
    });
}

module.exports.info = {
    name: "inventory",
    description:"check your inventory",
    rateLimit: 3,
    cooldown: 2e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : ["i", "pockets", "bag"],
    enabled : true
}