const { SlashCommandBuilder } = require('discord.js')

module.exports = {


    data: new SlashCommandBuilder() 
        .setName("pin")
        .setDescription("Pins the message to the #hall-of-fame channel")
        .addStringOption((opt) =>
            opt
                .setName("Message ID")
                .setDescription("Set the message you want to forward.")
        ),

    async execute(interaction) {
        const messageID = interaction.options.getString('Message ID')
        const channel = interaction.guild.channels.find(ch => ch.name === 'hall-of-fame')
        await channel.send(messageID)
    }
}