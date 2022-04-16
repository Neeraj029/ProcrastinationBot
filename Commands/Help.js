const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help for our procrastinators!'),
	execute(interaction) {
		
		const exampleEmbed = new MessageEmbed()
            .setColor('#ecc1c1')
            .setTitle('Help')
            // .setURL('https://discord.js.org/')
            .setAuthor({ name: 'ProcrastinationBot - Imma try stop you procrastinating!', iconURL: 'https://cdn.discordapp.com/attachments/955778371621638177/964794873117032448/photodune-1226941-proverb-procrastination-is-the-thief-of-time-written-on-bunc-xs.jpg', url: 'https://discord.js.org' })
            .setDescription('Help about /stopme')
            .addFields(
                { name: '/stopme', value: '/stopme command mutes you and helps you beat procrastinating on discord 😉. It asks time: means how much time you wanna be muted/be productive. it excepts value in this format: 1h means 1 hour, 1w means 1 month, 1w means 1 week.' },
                { name: '\u200B', value: '\u200B' },
            )
            .setTimestamp()
            .setFooter({ text: 'Helps beat procrastination!', iconURL: 'https://cdn.discordapp.com/attachments/955778371621638177/964794873117032448/photodune-1226941-proverb-procrastination-is-the-thief-of-time-written-on-bunc-xs.jpg    ' });
        interaction.reply({embeds: [exampleEmbed]})
	},
};