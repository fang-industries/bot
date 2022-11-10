/*
 * This is the /purge command. It deletes messages
 *
 * Made with <3 by Jason and Jovan
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder, InteractionResponse } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /purge
   * Description  : Mass deletes messages
   *
   * What it does : A basic purging command
   *                to mass delete messages
   */

  // Define data for loader

  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Mass deletes messages. Purging time.")
    .addIntegerOption((opt) =>
        opt
            .setName("amount")
            .setDescription("Set the amount of messages deleted.")
    ),

    async execute(interaction) {
        const deleteAmount = interaction.options.getInteger("amount")
        await interaction.channel.bulkDelete(deleteAmount)
        await interaction.reply({ content:`${deleteAmount} messages deleted 😈.`, ephemeral: true })
    }

    
}
