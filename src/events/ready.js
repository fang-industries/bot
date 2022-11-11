/*
 * This is the ready event. It prints an output
 * once the bot is up and running.
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { Events } = require("discord.js");
const config = require("../../config.json");

// Export the command data for loader
module.exports = {
  /*
   * Event        : Ready
   * Usage        : Once
   *
   * What it does : Once the ready event is
   *                emitted, log to console.
   */

  // Define data for loader
  name: Events.ClientReady,
  once: true,

  // Execute the event
  execute(client) {
    console.log("The bot is ready! Logged in as " + client.user.tag);

    // Send a message to the debug channel
    const channel = client.channels.cache.get(config.bot.debug);
    channel.send("Bot is online!");
  },
};
