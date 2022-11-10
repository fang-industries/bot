/*
 * This is the /colour command. It creates a new colour
 * role for the member.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { parse } = require("dotenv");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /colour
   * Description  : Gives the member a given colour of their choosing.
   *
   * What it does : A basic command that gives
   *                the member who executed it
   *                a colour of their choosing
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("colour")
    .setDescription("Gives the member a given colour of their choosing.")
    .addStringOption((opt) =>
      opt
        .setName("hex")
        .setDescription("Provide a hex code for your role colour.")
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt.setName("name").setDescription("What would you like your role named?")
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    // Parse hex to rgb
    function hexToRgb() {
      const aRgbHex = interaction.options.getString("hex").match(/.{1,2}/g);

      if (interaction.options.getString("hex").startsWith("#")) {
        return [
          parseInt(aRgbHex.slice("1")[0], 16),
          parseInt(aRgbHex.slice("1")[1], 16),
          parseInt(aRgbHex.slice("1")[2], 16),
        ];
      } else {
        return [
          parseInt(aRgbHex[0], 16),
          parseInt(aRgbHex[1], 16),
          parseInt(aRgbHex[2], 16),
        ];
      }
    }

    // Create role for user
    const role = await interaction.guild.roles.create({
      name:
        interaction.options.getString("name") ?? interaction.member.displayName,
      color: hexToRgb(),
    });

    // Give the user the newly created role
    const givenRole = interaction.guild.roles.cache.get(role.id);
    interaction.member.roles.add(givenRole).catch(console.error);

    // Finally, reply with a response to the user
    await interaction.reply({
      content: "I've given you the role!",
      ephemeral: true,
    });
  },
};
