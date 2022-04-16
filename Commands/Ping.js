const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('replies with Pong!'),
	execute(interaction) {
		
		interaction.reply('Le Pong-gers!');
	},
};