const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]

	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId, guildId) , { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

//this is how you do comments in javascript
//is line 14 you can see Routes.applicationCommands(clientId) add a comma and add guildId to make these command guild Only