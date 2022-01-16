module.exports = (connection, entry, entryValue, field, newValue) => {
    const [rows, fields] = await connection.execute(`Update members Set ${field} = ${newValue} WHERE ${entry} = ${entryValue}`);
	
	return rows;
}