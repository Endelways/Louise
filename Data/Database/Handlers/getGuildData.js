module.exports = async (connection, guild) =>
{
	const [rows, fields] = await connection.execute(`SELECT * FROM guilds WHERE id = ${guild.id}`);
	if(rows.length < 1)
	{
		console.log("Guild was not found in the database, a new entry will be created")
		return await require('./createGuildData')(connection, guild);		
	}
	return rows;
	
}