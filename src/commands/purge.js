/*
 * This is the /purge command. It deletes messages
 *
 * Made with <3 by Jason and Jovan
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder } = require("discord.js");

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
        .setMaxValue(100)
        .setRequired(true)
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    // Define the amount of messages that will be deleted
    const deleteAmount = interaction.options.getInteger("amount");

    // Delete the given amount of messages
    await interaction.channel.bulkDelete(deleteAmount);

    // Finally, reply to the user
    await interaction.reply({
      content: `Purging complete - ${deleteAmount} messages was deleted! 😈`,
      ephemeral: true,
    });
  },
};
