const { Collection } = require('discord.js');
const glob = require('glob');
module.exports = (bot, path) => {
	bot.commands = new Collection();
	const jsFiles = glob.sync(path + '/**/*.js');
	// const jsFiles = files.filter(f => {f.split(".").pop() === "js"});
	// console.log(jsFiles);

	if (jsFiles.length <= 0) return console.log("Could not find any commands!"); 
	for (const file of jsFiles)
	{
		const cmd = require(`../.${file}`);
		bot.commands.set(cmd.info.name, cmd)
		if (cmd.info.aliases) {
			for (const alias of cmd.info.aliases)
			{
				bot.aliases.set(alias, cmd.info.name);
			}
		}
		console.log('\x1b[1m\x1b[32m',`Loaded \x1b[36m${file}`, '\x1b[32mas', `\x1b[35m${cmd.info.name}`);
	};
	console.log('\x1b[0mCommands has beeen loaded')
}
