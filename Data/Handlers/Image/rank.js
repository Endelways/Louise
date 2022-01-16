const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");
module.exports = async (msg, background, member_db, member, guild, clan) => {
    const xp = member_db[0].xp;
    const lvl = member_db[0].lvl;
    const reqXP = require("../xpSystem").xpCalculate(guild[0].xp_formula, lvl);
    const bg = await loadImage(join(__dirname,"../..","img", background));
    //const img = await jimp.read(background);
    //await img.resize(1000,333);
    //console.log(await img.getBufferAsync(jimp.MIME_PNG));    
    //await msg.channel.send({files : [new MessageAttachment(await img.getBufferAsync(jimp.MIME_PNG), "rank.png")]})
    // img.getBuffer(jimp.MIME_PNG, async (err, buffer) => {
    //     console.log(buffer);
    //    ;
    // });
    //const img = jimp.read(background).then( jmp => {jmp.resize(1000, 333)});
  //  img.getBuffer(jimp.MIME_PNG).then(async res => {
        
    const canvas = createCanvas(1000,333);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bg,0,0,canvas.width, canvas.height); 

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(200,216,670,65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(200,216,670,65);
    ctx.stroke();
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(200,141,420,65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(200,141,420,65);
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(200,66,330,65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(200,66,330,65);
    ctx.stroke();

    ctx.fillStyle = "#cccccc";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(200, 216, 670 * xp / reqXP, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#cccccc";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(285, 141, (335 * lvl / lvl), 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "35px Engravers MT";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${xp} / ${reqXP} XP`, 550, 260);

    ctx.font = "35px Engravers MT";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${lvl} LVL`, 450, 185);

    if(member_db[0]['clan'])
    {
        const emblem  = await loadImage(clan.Emblem);
        ctx.drawImage(emblem, 830, 66, 128, 128);
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(830,66,128,128);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(830,66,128,128);
        ctx.stroke();
        if(clan[0]['leader'] == member_db[0]['id'])
        {
            const lead  = await loadImage(join(__dirname,"../..","img","crown.png"));
            ctx.drawImage(lead, 853, -8, 80, 80);
        }
    }
    ctx.font = "40px Engravers MT";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${member_db[0].coin} 💵`, 400, 110);
    ctx.arc(170, 166, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar  = await loadImage(member.displayAvatarURL({format : "jpg"}));
    ctx.drawImage(avatar, 40, 40, 250, 250);
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.1;
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(50, 200, Math.PI * 76 , 50);
    ctx.globalAlpha = 1;
    ctx.strokeRect(50, 200, Math.PI * 76, 50);
    
    ctx.font = "32px Engravers MT";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${member.displayName}`, 170, 235);

    const attachment = new MessageAttachment(canvas.toBuffer(),"rank.png");
    await msg.channel.send({files : [attachment]});
}

