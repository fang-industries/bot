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
    const clientPing = Date.now() - message.createdTimestamp;
    const wsPing = Math.round(client.ws.ping);

    // Reply to the user with "Pong!"
    await interaction.reply(
      `**Ping** is ${clientPing} ms. \n \n
      **API Ping** is ${wsPing} ms`
    );
  },
};
