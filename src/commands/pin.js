const { SlashCommandBuilder, messageLink } = require('discord.js')

module.exports = {


    data: new SlashCommandBuilder() 
        .setName("pin")
        .setDescription("Pins the message to the #hall-of-fame channel")
        .addStringOption((opt) =>
            opt
                .setName("ID")
                .setDescription("Set the message you want to forward.")
        ),

    async execute(interaction) {
        const msgID = interaction.options.getString("ID")
        const channelID = interaction.guild.channels.find(ch => ch.name === 'hall-of-fame')
        const fetchmsg = interaction.channel.fetchMessage(msgID)
        await console.log(fetchmsg)
    }
}