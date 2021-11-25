const Guild = require('../Schemas/guild');

module.exports = async function getGuildData (gld) 
{
	let res = await Guild.findById(gld.id).exec();
	if(res == null)
	{
		res = require('./createGuildData')(gld);
	}
	return res;
}
