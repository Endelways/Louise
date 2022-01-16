module.exports = async (Client, Member) => {
    let guild = Member.guild;
    gld = await require('../Database/Handlers/getGuildData')(guild);
    if(parseInt(gld.unknownRoleID, 10) != NaN) 
    {
        Member.roles.add(gld.unknownRoleID);
    }
}