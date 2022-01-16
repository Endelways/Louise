module.exports = async (connection, member) =>
{
	await connection.execute(`INSERT INTO members(guild_id, id, name, xp, lvl, coins) VALUES(?,?,?,?,?,?)`, [ member.guild.id, member.id, member.displayName, 1, 1, 0]);
	
	return require('./getMember')(connection, member);
}