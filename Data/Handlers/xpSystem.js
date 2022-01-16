Parser = require('expr-eval').Parser;

function xpCalculate(func, lvl)
{
	let res = Parser.parse(func).evaluate({x:lvl});
	return parseInt(res, 10);
}
function lvlCalculate(func, xp)
{
	let eXp = 1;
	while(xp > Parser.parse(func).evaluate({x:eXp}))
	{
		eXp++;
	}
	return eXp;
}
async function checkIfUp(connection, guild_db, msg)
{			
	const member = await require("../Database/Handlers/getMember")(connection, msg.member);
	await connection.execute(`Update members Set xp = ${member[0]['xp'] + 1} WHERE id = ${member[0]['id']}`);
	//member.coin++;
	member.xp += (parseInt(msg.content.length / 10, 10) + 1);
	let neededXP = xpCalculate(guild_db[0]['xp_formula'], member[0]['lvl']);
	if(member[0]['xp'] >= neededXP)
	{
		await connection.execute(`Update members Set lvl = ${member[0]['lvl'] + 1} WHERE id = ${member[0]['id']}`);
		if(msg)
		msg.reply(`Ты получил ${member[0]['lvl'] + 1} уровень`);
	}
}

module.exports = {
	xpCalculate,
	lvlCalculate,
	checkIfUp
}