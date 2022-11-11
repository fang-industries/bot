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
const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

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
    // Parse colours, remove # if it exists
    const returnedColour = interaction.options.getString("hex");

    function parseColour() {
      if (returnedColour.startsWith("#")) {
        return returnedColour.slice(1);
      }

      return null;
    }

    // Create role for user
    const role = await interaction.guild.roles.create({
      name:
        interaction.options.getString("name") ?? interaction.member.displayName,
      color: "0x" + (parseColour() ?? interaction.options.getString("hex")),
    });

    // Give the user the newly created role
    const givenRole = interaction.guild.roles.cache.get(role.id);
    interaction.member.roles.add(givenRole).catch((e) => {
      // Log the error to console
      console.error(e);

      // Log to error to debug channel
      const channel = client.channels.cache.get(config.bot.debug);
      channel.send(`I've ran into an issue! Check this out:\n\`\`\`${e}\`\`\``);
    });

    // Finally, reply with a response to the user
    await interaction.reply({
      content: "I've given you the role!",
      ephemeral: true,
    });
  },
};
