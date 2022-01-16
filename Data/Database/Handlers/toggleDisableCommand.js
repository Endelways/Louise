module.exports = async (connection, guild, cmd, flag) =>
{
    if(flag == 'false')
    {
        console.log("insert");
        await connection.execute(`INSERT INTO disabled_cmds(cmd_name, guild_id) VALUES(?,?)`, [cmd, guild.id]);
    }
    else 
    {
        console.log("delete");
        await connection.execute(`DELETE FROM disabled_cmds WHERE cmd_name = '${cmd}' AND guild_id = ${guild.id}`);
    }
	return;
}