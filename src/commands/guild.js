/*
 * This is the /guild command. It displays the
 * information about this guild.
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
   * Command      : /guild
   * Description  : Displays this server's information
   *
   * What it does : The command returns with the server's
   *                information, incl. user count, channel count,
   *                creation date, user join date, and an explanation
   *                for all roles in the guild, customisable in
   *                miscellaneous/assets/roles.json
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("guild")
    .setDescription("Displays this server's information."),

  // Execute the command asynchronously
  async execute(interaction) {
    // Create an embed to return with
    const embed = new EmbedBuilder()
      .setColor(0xe26b21)
      .setTitle(interaction.guild.name)
      .setDescription(interaction.guild.description)
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor({
        name: `Glad you asked, ${interaction.member.displayName}`,
      })
      .addFields(
        {
          name: "👥 User Count",
          value: `${interaction.guild.memberCount} members`,
          inline: true,
        },
        {
          name: "🗣️ Channel Count",
          value: `${interaction.guild.channels.channelCountWithoutThreads} channels`,
          inline: true,
        },
        {
          name: "🎆 Server Creation",
          value: `<t:${Math.round(
            interaction.guild.createdTimestamp / 1000
          ).toString()}:R>`,
          inline: true,
        },
        {
          name: "📆 Join Date",
          value: `<t:${Math.round(
            interaction.guild.joinedTimestamp / 1000
          ).toString()}:R>`,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        iconURL: interaction.guild.iconURL(),
        text: "Brought to you by, Wingstart",
      });

    // Reply to the user
    await interaction.reply({ embeds: [embed] });
  },
};
