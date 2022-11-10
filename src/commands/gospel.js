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
const verses = require("../miscellaneous/assets/verses.json");

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
    .setName("gospel")
    .setDescription("Some words of wisdom from the almighty chicken God."),

  // Execute the command asynchronously
  async execute(interaction) {
    // Select a random verse
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];

    // Create embed
    const embed = new EmbedBuilder()
      .setColor(0xf1b581)
      .setTitle(`🐔 ${randomVerse.title} 🐔`)
      .setDescription(randomVerse.content);

    // Respond to the user with the embed
    await interaction.reply({ embeds: [embed] });
  },
};
