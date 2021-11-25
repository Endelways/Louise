const Guild = require('../Schemas/guild');

module.exports = async function createGuildData(gld)
{
	const guild = new Guild({
		_id : gld.id,
		prefix : '!',
	});
	guild.save();
	return guild;
}
