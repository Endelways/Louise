module.exports = async (Client, interaction) => {
    if (!interaction.isButton()) return;
    if(interaction.customId == "guildEdit")
    {
        const row = new Ds.MessageActionRow()
        .addComponents(
            new Ds.MessageButton()
                .setCustomId('guildEdit')
                .setLabel('Edit')
                .setStyle('PRIMARY'),
        );
        interaction.message.edit({components: [row]})
    }
	//console.log(interaction);
}