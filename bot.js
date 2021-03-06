const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const process = require("process");
const commands = [];

require('dotenv').config()




// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const botCommands = [];
const botInstance = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
botInstance.slashCommands = new Collection();

// read the files
const slashFiles = fs
    .readdirSync("./Commands")
    .filter((file) => file.endsWith(".js"));

for (const file of slashFiles) {
    const command = require(`./Commands/${file}`);
    botInstance.slashCommands.set(command.data.name, command);
    botCommands.push(command.data.toJSON());
}

botInstance.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = botInstance.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
},
);


// setup slash commands
const rest = new REST({
    version: "9",
}).setToken(process.env.BOT_TOKEN);
(async () => {
    try {
        console.log(
            "Started refreshing application (/) commands."
        );
        await rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), {
            body: botCommands,
        });

        console.log(
            "Successfully reloaded application (/) commands."
        );
    } catch (error) {
        console.log("shit something went wrong")
    }
})();



botInstance.on("ready", () => {
    console.log("bot is alive")
    // get Procrastinator role
    botInstance.guilds.cache.forEach(async guild => {
        guild.roles.cache.forEach(async role => {
            // if role procrastinator, send it to StopMe.js
            if (role.name === "Procrastinator") {
                module.exports = {procrastinatorRole: role}
            }
        })})
});

botInstance.login(process.env.BOT_TOKEN);