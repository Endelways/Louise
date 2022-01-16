module.exports = async (connection, db_member) =>
{
	const [rows, fields] = await connection.execute(`SELECT * FROM clans WHERE id = ${db_member[0]['clan_id']}`);
	return rows;
	
}