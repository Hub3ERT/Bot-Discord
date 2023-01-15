const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

for (const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.ser(command.data.name, command);
    }
}

client.once('ready', () => {
   console.log('Bot jest włączony')

   client.user.setPresence({ activities: [{ name: 'Clash!', type: ActivityType.Listening }]});
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        return console.error('Nie znaleziono takiej komendy!');
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania tej komendy', eqhemeral: true });
    }
});


client.login('MTA1ODY5MTUyNzQxODg0NzI2NA.G5sbe4.jVbLJR71vLuStUAJLwivy6QxGh02dn7gIF5DYk');