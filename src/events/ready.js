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

// Import express.js for invitation API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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
  async execute(client) {
    // Define port to use for API
    const port = 10000;

    console.log("The bot is ready! Logged in as " + client.user.tag);

    // Send a message to the debug channel
    const channel = client.channels.cache.get(config.bot.debug);
    channel.send("Bot is online!");

    // Initialise express.js
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    // Where should new users be invited to?
    const inviteChannel = client.channels.cache.get(config.bot.inviteChannel);

    app.listen(10000, function (err) {
      if (err) console.log(err);
      console.log("API is running on port", port.toString());

      channel.send(
        "Wingstart's invite API is running on port " + port.toString()
      );
    });

    // Post new invite on API
    app.get("/inv", async function (req, res) {
      const fetchInvites = await inviteChannel.fetchInvites();

      invArr = Array.from(fetchInvites?.keys());

      res.json([invArr[0]]);
    });

    // Create a new invite that expires in 30 minutes, every 30 minutes.
    setInterval(() => {
      inviteChannel.createInvite({
        maxAge: 30 * 60,
        maxUses: 3,
        unique: true,
      });

      console.log("I've created an invite!");
    }, 30 * 60 * 1000);
  },
};
