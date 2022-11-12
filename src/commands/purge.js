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
    )
    .addStringOption((opt) =>
      opt
        .setName("includes")
        .setDescription("Deletes messages that include the given string")
    )
    .addStringOption((opt) =>
      opt
        .setName("excludes")
        .setDescription("Deletes messages that exclude the given string")
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    /*
     * Gotta give credits where it's due!
     * Credits: https://stackoverflow.com/questions/57827514/purge-messages-that-contain-a-certain-string-discord-js
     *
     * Code initially written for v11, but adapted to v14.
     *
     * Thank you, kind stranger!
     */

    // Define the amount of messages that will be deleted
    const deleteAmount = interaction.options.getInteger("amount");

    if (interaction.options.getString("includes")) {
      // Define the included keyword to be deleted
      const incl = interaction.options.getString("includes");

      // Fetch the messages from the given channel
      const fetchMsg = await interaction.channel.messages.fetch({
        limit: deleteAmount,
      });

      // If a message doesn't include this word, don't include in collection
      const deleteMsg = await fetchMsg.filter((m) => m.content.includes(incl));

      // Burn those messages alive!
      await interaction.channel.bulkDelete(deleteMsg, true);
      /*                                              ^^^^
       * The `true` parameter tells `bulkDelete()` to skip messages
       * that are too old (14 days) to delete due to API limitations.
       */

      // Finally, reply to the user
      await interaction.reply({
        content: `Purging complete - ${deleteMsg.size} messages (containing the word \`${incl}\`) was deleted! 😈`,
        ephemeral: true,
      });
    } else if (interaction.options.getString("excludes")) {
      // Define the included keyword to be deleted
      const excl = interaction.options.getString("excludes");

      // Fetch the messages from the given channel
      const fetchMsg = await interaction.channel.messages.fetch({
        limit: deleteAmount,
      });

      // If a message doesn't include this word, don't include in collection
      const deleteMsg = await fetchMsg.filter((m) => !m.content.includes(excl));

      // Burn those messages alive!
      await interaction.channel.bulkDelete(deleteMsg, true);
      /*                                              ^^^^
       * The `true` parameter tells `bulkDelete()` to skip messages
       * that are too old (14 days) to delete due to API limitations.
       */

      // Finally, reply to the user
      await interaction.reply({
        content: `Purging complete - ${deleteMsg.size} messages (not containing the word \`${excl}\`) was deleted! 😈`,
        ephemeral: true,
      });
    } else {
      // Define the amount of messages that will be deleted
      const deleteAmount = interaction.options.getInteger("amount");

      // Delete the given amount of messages
      await interaction.channel.bulkDelete(deleteAmount);

      // Finally, reply to the user
      await interaction.reply({
        content: `Purging complete - ${deleteAmount} messages was deleted! 😈`,
        ephemeral: true,
      });
    }
  },
};
