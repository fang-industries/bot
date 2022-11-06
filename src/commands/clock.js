/*
 * This is the /clock command. It responds with the
 * current time in the time-zone defined in config.json
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /clock
   * Description  : Returns with the current time and date.
   *
   * What it does : A basic clock command, it
   *                returns the current date
   *                and time, forced in UTC+7
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("clock")
    .setDescription("Returns with the current time and date."),

  // Execute the command asynchronously
  async execute(interaction) {
    // Create a new date object
    const clock = new Date();

    // Define the timezone given from user input, otherwise use config.
    const timezone = require("../../config.json").misc.timezone;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Clock - ${timezone}`,
        iconURL:
          "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/four-oclock_1f553.png",
      })
      .addFields(
        {
          name: "Time",
          value: `${clock.toLocaleTimeString("en-GB", {
            timezone,
          })}`,
        },
        {
          name: "Date",
          value: clock.toLocaleDateString("en-GB", {
            timeZone: timezone,
          }),
        }
      );

    // Reply to the user with the current time.
    await interaction.reply({ embeds: [embed] });
  },
};
