module.exports = async (connection, item, msg) =>
{
    const [rows, fields] = await connection.execute(`SELECT * FROM inventory WHERE member_id = ${msg.member.id} AND guild_id = ${msg.guild.id} AND item_name = '${item.name}' AND cost = ${item.cost}`);
    if(rows.length < 1)
        await connection.execute(`INSERT INTO inventory(member_id, guild_id, item_name, count, cost) VALUES(?,?,?,?,?)`, [msg.member.id, msg.guild.id, item.name, 1, item.cost]);
	else
        await connection.execute(`Update inventory Set count = ${rows[0]['count'] + 1} WHERE member_id = ${msg.member.id} AND guild_id = ${msg.guild.id} AND item_name = '${item.name}' AND cost = ${item.cost}`);
}