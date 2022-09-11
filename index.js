const Discord = require('discord.js')

const client = new Discord.Client( { intents: 32767 });
const prefix = 'reyna'
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, gld1 } = require('./config.json');
const {Collection} = require('discord.js');
const path = require('path')
const fs = require('node:fs')

client.on('ready',() => {
  console.log('Logged in')
})

client.commands = new Collection();
const commandPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const filePath = path.join(commandPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
    let ping = client.ws.ping;
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message=>{
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();


  if (command === "say") {
    const input = args.slice(0).join(" ")
    message.channel.send(`Reyna said: ${input}`)
  }

  if(command === "test"){
    message.channel.send("Hello World")
  }

  if(command === "ping"){
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`).then(async msg => {
      setTimeout(() => {
        msg.delete()
      }, 5000);
    })
  }
})

client.login(token)
