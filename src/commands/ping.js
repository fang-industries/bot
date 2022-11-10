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
    const clientPing = Number(Date.now() - interaction.createdTimestamp)
    const wsPing = Number(Math.round(interaction.client.ws.ping))
    const avgping = Math.round(wsPing + clientPing / 2)
    let pingam 
    // Conditions
    if (avgping < 50) {
      pingam = ":green_circle:"
    } else if (avgping > 50) {
      pingam = ":yellow_circle:"
    } else if (avgping > 200) {
      pingam = ":red_circle:"
    } else if (avgping == 0) {
      pingam = ":sparkles:"
    }
    // Reply to the user with the latency
    await interaction.reply(
      `${pingam} **Ping** is ${clientPing} ms.\n**API Ping** is ${wsPing} ms`
    );
  },
};
