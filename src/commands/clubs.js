/*
 * This is the /clubs command. It allows you
 * to join different divisions of Fang Industries.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /clubs
   * Description  : Gives you access to specific channels.
   *
   * What it does : It allows you to join
   *                different divisions of
   *                Fang Industries.
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("clubs")
    .setDescription("Gives/removes access to specific channels.")
    .addStringOption((option) =>
      option
        .setName("club")
        .setDescription("Select a club you'd like to join/leave!")
        .setRequired(true)
        .addChoices(
          { name: "Coding (Wingstart, fangdustry.me)", value: "coding" },
          { name: "Writing (stories.fangdustry.me, etc.)", value: "writing" },
          { name: "Debate (#hot-takes channel)", value: "debate" }
        )
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    const role = interaction.options.getString("club");

    if (role === "coding") {
      if (
        interaction.member.roles.cache.some(
          (r) => r.id === "1040642706914934927"
        )
      ) {
        interaction.member.roles.remove("1040642706914934927");
        return interaction.reply({
          content: "I've removed your coding role!",
          ephemeral: true,
        });
      } else {
        interaction.member.roles.add("1040642706914934927");
        return interaction.reply({
          content: "I've given you the coding role!",
          ephemeral: true,
        });
      }
    }

    if (role === "writing") {
      if (
        interaction.member.roles.cache.some(
          (r) => r.id === "1055372629311238255"
        )
      ) {
        interaction.member.roles.remove("1055372629311238255");
        return interaction.reply({
          content: "I've removed your writing role!",
          ephemeral: true,
        });
      } else {
        interaction.member.roles.add("1055372629311238255");
        return interaction.reply({
          content: "I've given you the writing role!",
          ephemeral: true,
        });
      }
    }

    if (role === "debate") {
      if (
        interaction.member.roles.cache.some(
          (r) => r.id === "1055374938556616724"
        )
      ) {
        interaction.member.roles.remove("1055374938556616724");
        return interaction.reply({
          content: "I've removed your writing role!",
          ephemeral: true,
        });
      } else {
        interaction.member.roles.add("1055374938556616724");
        return interaction.reply({
          content: "I've given you the writing role!",
          ephemeral: true,
        });
      }
    }
  },
};
