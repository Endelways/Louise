const logger = require("../Info/config");

module.exports = async (Client, msg) => {
    //logger(msg.guild.id, "messages").info(msg.author.id + " " + msg.content)
    if (msg.author.bot || msg.channel.type != "GUILD_TEXT") return;
			const db = await require('../Database/Handlers/getGuildData')(msg.guild);
			//console.log(db);
			//if(msg.member.roles.cache.has(db.cpchCfg.role)) return;
			if (msg.content.startsWith(db.prefix))
			{
				const args = msg.content.slice(db.prefix.length).trim().split(/ +/g);
				const command = args.shift();
				console.log("Введенная комманда:", command, "Введенные аргументы: ", args);
				const cmd = Client.commands.get(command) || Client.commands.get(Client.aliases.get(command));
				if(!cmd) return;
				try
				{
					require('../Handlers/checkPermissions')(Client, msg, cmd, args);
					//cmd.run();
				} 
				catch (e) {
					console.error(e)
					msg.reply(`Error: ${e}`)
				}
			}
			// else
			// {
			// 	const member = await mongo.getMember(msg.guild, msg.member);
			// 	member.coin++;
			// 	member.xp += (parseInt(msg.content.length / 10, 10) + 1);
			// 	utils.checkIfUp(db, member, msg);
			// }
}
