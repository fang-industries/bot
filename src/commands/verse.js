/*
 * This is the /purge command. It deletes messages
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
  data: new SlashCommandBuilder()
    .setName("gospel")
    .setDescription("Some words of wisdom from the almighty chicken God."),

  async execute(interaction) {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    console.log(randomVerse);
  },
};
