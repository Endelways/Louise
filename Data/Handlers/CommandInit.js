const { Collection } = require('discord.js');
const glob = require('glob');
var appRoot = require('app-root-path');

module.exports = (bot, path) => {
	let fullPath = appRoot.path + path;
	//let commandsList = fs.readFileSync(appRoot.path + "/Data/Database/commandsList.list", "utf8");
	bot.commands = new Collection();
	const jsFiles = glob.sync(fullPath + '/**/*.js');
	if (jsFiles.length <= 0) return console.log("Could not find any commands!"); 
	for (const file of jsFiles)
	{
		const cmd = require(`${file}`);
		if(cmd.info.enabled)
		{
			bot.commands.set(cmd.info.name, cmd)
			if (cmd.info.aliases) 
			{
				for (const alias of cmd.info.aliases)
				{
					bot.aliases.set(alias, cmd.info.name);
				}
			}	
			console.log('\x1b[1m\x1b[32m',`Loaded \x1b[36m${file}`, '\x1b[32mas', `\x1b[35m${cmd.info.name}`);
		}
	};
	console.log('\x1b[0mCommands has beeen loaded')
}
