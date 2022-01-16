const logger = require("../Info/config");

module.exports = async (Client, msg) => {
    //logger(msg.guild.id, "messages").info(msg.author.id + " " + msg.content)
    if (msg.author.bot || msg.channel.type != "GUILD_TEXT") return;
		const db = await require("../Database/Handlers/getGuildData")(Client.db, msg.guild);
			//console.log(db);
			// const disabledCmds = new Set(db.disabledCmds);
	//if(msg.member.roles.cache.has(db.cpchCfg.role)) return;
		if (msg.content.startsWith(db[0]['prefix']))
		{
			const args = msg.content.slice(db[0]['prefix'].length).trim().split(/ +/g);
			const command = args.shift();
			console.log("Введенная комманда:", command, "Введенные аргументы: ", args);
			const cmd = Client.commands.get(command) || Client.commands.get(Client.aliases.get(command));
			if(!cmd) return;
			if(await require("../Database/Handlers/checkDisabled")(Client.db, msg.guild, cmd.info)) 
			{
				msg.reply("This command has been deactivated by Admin")
				return;
			}
			try
			{
				require('../Handlers/checkPermissions')(Client, db, msg, cmd, args);
				//cmd.run();
			} 
			catch (e) {
				console.error(e)
				msg.reply(`Error: ${e}`)
			}
		}
		else
		{
			require('../Handlers/xpSystem').checkIfUp(Client.db, db, msg);
		}
}
