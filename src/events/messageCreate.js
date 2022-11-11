/*
 * This is the messageCreate event; it is only
 * used when I need to send specialised messages
 * that is not available with commands
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { Events } = require("discord.js");
const config = require("../../config.json");
const fs = require("node:fs");

// Export the command data for loader
module.exports = {
  /*
   * Event        : messageCreate
   * Usage        : On
   *
   * What it does : On user messageCreate event,
   *                if message matches with pre-determined
   *                message, respond with a pre-determined
   *                reply.
   */

  // Define data for loader
  name: Events.MessageCreate,

  // Execute the event asynchronously
  async execute(message) {
    // Define the starting prefix
    const prefix = "wingstartDevel.";

    // Ignore the message if it isn't from bot owner
    if (!message.author.id === config.bot.owner) return;

    // Ignore the message if it doesn't start with a prefix
    if (!message.content.startsWith(prefix)) return;

    // Custom messages
    if (message.content.startsWith(prefix + "message.send")) {
      if (message.content === prefix + "message.send" + "(rules)") {
        message.delete();
        try {
          message.channel.send(
            fs.readFileSync("./src/miscellaneous/assets/rules.txt", "utf8")
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
};
