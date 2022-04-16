const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, InteractionCollector } = require('discord.js');

const timePeriod = {"w": "week", "d": "day", "h": "hour", "m": "month", "s": "second"};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stopme')
		.setDescription('tries to stop you procastinating!').addStringOption(option =>
            option.setName('time')
                .setDescription('how much time do you want to stay muted? e.g. 1h(hour), 1d(day), 1w(week), 1m(month) etc')
                .setRequired(true))
    ,
	async execute(interaction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('agree')
                .setLabel('Yes!')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('nothamks')
                .setLabel('No thanks')
                .setStyle('SUCCESS'),
        );

        const filter = i => i.customId === 'agree' && i.customId === 'agree_last'

        const collector = interaction.channel.createMessageComponentCollector({time: 15000 });

        const time = interaction.options.get("time").value;
        const timeOnly = time.slice(0,-1);
        const finalTime = timeOnly + " " + (timeOnly == 1 ? timePeriod[time.charAt(time.length - 1)] : timePeriod[time.charAt(time.length - 1)] + "s" )
        collector.on('collect', async i => {
            if (i.customId === 'agree') {
                await i.update({content: "⚠ LAST WARNING ⚠ Are you really sure you want to get muted? this action is irreversable", components: [new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('agree_last')
                            .setLabel('Yes!')
                            .setStyle('DANGER'),
                        new MessageButton()
                            .setCustomId('nothamks')
                            .setLabel('No thanks')
                            .setStyle('SUCCESS'),
                    )]});
            }
            if (i.customId === 'agree_last'){
                await i.update({content: `Alrighty, seeya after ${finalTime} 👋🏻`, components: [] }) // after send this message, delete last warning message
                const role = interaction.guild.roles.cache.find(role => role.name === 'Procrastinator')
                await interaction.member.roles.add(role)
                
                if(time.charAt(time.length - 1) == "w"){
                    setTimeout(async () => {
                        await interaction.member.roles.remove(role)
                    }, timeOnly * 604800000);
                }
                else if(time.charAt(time.length - 1) == "d"){
                    setTimeout(async () => {
                        await interaction.member.roles.remove(role)
                    }, timeOnly * 86400000);
                }
                else if(time.charAt(time.length - 1) == "h"){
                    setTimeout(async () => {
                        await interaction.member.roles.remove(role)
                    }, timeOnly * 3600000);
                }
                // else if for month
                else if(time.charAt(time.length - 1) == "m"){
                    setTimeout(async () => {
                        await interaction.member.roles.remove(role)
                    }, timeOnly * 50000);
                }
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

		await interaction.reply({content: `Are you really sure you want to mute yourself for ${finalTime}?!`, components: [row] });
	},
};