const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('test')
        .setDescription('testowa komenda'),
    async execute(interaction) {
        interaction.reply('Test');
    }
}