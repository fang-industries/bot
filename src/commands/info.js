/*
 * This is the /gospel command. It spits out random
 * parodies of bible verses. We stayed up for this.
 *
 * Made with <3 by Jason and Jovan
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /gospel
   * Description  : Some words of wisdom from the almighty chicken God.
   *
   * What it does : i honestly don't know anymore man
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Displays server information."),

  // Execute the command asynchronously
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xe26b21)
      .setTitle(interaction.guild.name.toString())
      .setDescription("Small community of friends.")
      .setThumbnail(interaction.guild.icon.toString())
      .setAuthor({
        name: `Glad you asked, ${interaction.member.displayName}`,
      })
      .addFields(
        {
          name: "This server has: ",
          value: `${interaction.guild.memberCount} members`,
          inline: true,
        },
        {
          name: "The server was created at: ",
          value: interaction.guild.createdTimestamp.toString(),
          inline: true,
        },
        {
          name: "You joined the server at: ",
          value: interaction.guild.joinedTimestamp.toString(),
          inline: true,
        }.setFooter({
          iconURL: interaction.guild.icon.toString(),
          text: "Brought to you by, Wingstart",
        })
      );
    await interaction.reply({ embeds: [embed] });
  },
};
