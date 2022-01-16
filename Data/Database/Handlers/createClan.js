module.exports = async (connection, db_member, clan) =>
{
	const res = await connection.execute(`INSERT INTO clans(name, leader, icon_url, lvl) VALUES(?,?,?,?)`, [ clan.name, db_member[0]['id'], clan.icon_url, 1]);
	return require('./getClan')(connection, db_member);
}