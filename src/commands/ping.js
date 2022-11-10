/*
 * This is the /ping command. It responds with the
 * client and WS ping when executed.
 *
 * Made with <3 by Jason and Jovan
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /ping
   * Description  : Pong!
   *
   * What it does : A basic ping command, it
   *                responds with the WS and
   *                client ping.
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the Client and API Ping"),

  // Execute the command asynchronously
  async execute(interaction) {
    // Define the two pings
    const clientPing = Date.now() - interaction.createdTimestamp;
    const wsPing = Math.round(interaction.client.ws.ping);
    var pingam 
    // Conditions
    if (clientPing || wsPing < 50) {
      var pingam = ":green_circle:"
    } else if (clientPing || wsPing > 50) {
      var pingam = ":yellow_circle"
    } else if (clientPing || wsPing > 200) {
      var pingam = ":red_circle"
    } else if (clientPing || wsPing == 0) {
      var pingam = ":sparkle:"
    }
    // Reply to the user with "Pong!"
    await interaction.reply(
      `**Ping** is ${clientPing} ms ${pingam}. \n \n
      **API Ping** is ${wsPing} ms ${pingam}`
    );
  },
};
