const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the ping of the bot'),
    async execute(interaction, client) {

        try{
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        }
        catch (error){
            interaction.reply(error.toString())

        }
    }
}