module.exports = async (connection, guild) =>
{
	const res = await connection.execute(`INSERT INTO guilds(id, title, prefix, xp_formula) VALUES(?,?,?, ?)`, [ guild.id, guild.name, "!", "5 * 2^(x-1)"]);
	return require('./getGuildData')(connection, guild);
}