const Ds = require('discord.js');

module.exports.run = async (bot, db, msg, args) => {
    const db_member = await require('../../Database/Handlers/getMember')(bot.db, msg.member);
    let emb = new Ds.MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor("#2f3136")

    switch(db_member[0]['job'])
    {
        case null :
            emb.setTitle(`Для того что бы выполнять работу, в начале устройся на нее, используй ${db[0]['prefix']}`)
            return await msg.reply({embeds : [emb]});
        case 'fisher' :
            emb.setTitle(`Локация: **Загаженные ставки**`)
            emb.setDescription(`Возможный улов: *малый* - **карась, верховодка**`)
            emb.addField(`\u200b`,'💧💧💧💧💧💧💧💧💧🐟💧💧💧💧💧💧💧💧💧').addField(`\u200b`,'🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴');
            const action = {
                type : 'ACTION_ROW',
                components:[{
                    type: 'BUTTON',
                    label:'Рыбачить',
                    customId:'fish_working',
                    style:'PRIMARY',
                }]
            };
            
            botMsg = await msg.reply({embeds : [emb], components: [action]});
            const collector = await botMsg.createMessageComponentCollector();
            let timers = {};
            let fish;
            collector.on('collect', async Interaction => {
                
                Interaction.deferUpdate();
                if(Interaction.user.id == msg.member.id)
                {
                    let newAction = {
                        type : 'ACTION_ROW',
                        components:[{
                            type: 'BUTTON',
                            label:'Подсечь',
                            customId:'take_fish',
                            style:'PRIMARY',
                        }]
                    };
                    switch(Interaction.customId)
                    {
                        case "fish_working":
                            botMsg.edit({components:[newAction]});
                            let rnd = getRandomInt(9) + 1;
                            timers.timer1 = setTimeout(()=>{
                                    emb.fields[1].value = '🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢';
                                    botMsg.edit({embeds:[emb]});
                                }, rnd * 1000);
                            timers.timer2 = setTimeout(()=>{
                                    emb.fields[1].value = '⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫';
                                    botMsg.edit({embeds:[emb]});
                                }, (rnd * 1000) + 1000);
                            break;
                    
                        case "take_fish":
                            clearTimeout(timers.timer1);
                            clearTimeout(timers.timer2)
                            if(emb.fields[1].value == '🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢')
                            {
                                
                                fish = itemGenerate();
                                emb.fields = [];
                                emb.addField(`\u200b`, `Поздравляем, вы поймали: ${fish.name} - вес составляет: ${fish.weight}, стоимость ${fish.cost}`)
                                newAction.components[0].label = "Забрать улов";
                                newAction.components[0].customId = "get_catch";
                                newAction2 = {
                                    type : 'ACTION_ROW',
                                    components:[{
                                        type: 'BUTTON',
                                        label:'Выбросить',
                                        customId:'free_rod',
                                        style:'PRIMARY',
                                    }]
                                };
                                botMsg.edit({embeds:[emb], components:[newAction, newAction2]}); 
                            }
                            else
                            {
                                emb.fields = [];
                                emb.addField(`\u200b`, "Неудача, рыбка сорвалась")
                                newAction.components[0].label = "Вытащить удочку";
                                newAction.components[0].customId = "free_rod";
                                botMsg.edit({embeds:[emb], components:[newAction]}); 
                            }
                            break; 
                        case "get_catch":
                            require("../../Database/Handlers/addItem")(bot.db, fish, msg);
                        case "free_rod":
                            botMsg.delete();
                            break;

                    }
                }
            });
          //  let timerId = setInterval(() => editEmeb(botMsg, emb), 100);
           // setTimeout(()=>clearInterval(timerId), 47e2)
            break;
        case 'hunter' :
            break;
        case 'teacher' :
            break;
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function itemGenerate(){
    let weight = getRandomInt(500);
    if(getRandomInt(100) % 5 == 0)
    {
        return fish = {
            name : "Карась",
            weight: weight,
            cost: 2.5 * weight,
            count: 1
        }
    }
    else 
    {
        return fish = {
            name : "Верховодка",
            weight: weight,
            cost: 1.25 * weight,
            count: 1
        }
    }

}


module.exports.info = {
    name: "work",
    description:"get actualy jobs",
    rateLimit: 3,
    cooldown: 1e4,
    ownerOnly : false,
    userPerms : [],
    clientPerms : ["SEND_MESSAGES"],
    aliases : [""],
    enabled : true
}