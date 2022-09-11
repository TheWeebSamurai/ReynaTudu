const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the ping of the bot'),
    async execute(interaction, client) {

        let ping = client.ws.ping;
        await interaction.reply(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(ping)}ms`);
    }
}