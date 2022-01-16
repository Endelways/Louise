module.exports = async (connection, guild, cmd) =>
{
	const [rows, fields] = await connection.execute(`SELECT * FROM disabled_cmds WHERE cmd_name = '${cmd.name}' AND guild_id = ${guild.id}`);
	return (rows.length > 0);
}