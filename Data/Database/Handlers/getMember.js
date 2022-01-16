module.exports = async (connection, member) =>
{
	const [rows, fields] = await connection.execute(`SELECT * FROM members WHERE id = ${member.id} AND guild_id = ${member.guild.id} `);
	if(rows.length < 1)
	{
		console.log("Member was not found in the database, a new entry will be created")
		return require('./createMember')(connection, member);
	}
	else 
	{
		return rows;
	}
}