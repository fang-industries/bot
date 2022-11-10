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
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /ping
   * Description  : Fetches the client and websocket ping.
   *
   * What it does : A basic ping command, it
   *                responds with the WS and
   *                client ping.
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Fetches the client and websocket ping."),

  // Execute the command asynchronously
  async execute(interaction) {
    // Define the two pings
    const clientPing = Date.now() - interaction.createdTimestamp;
    const wsPing = Math.round(interaction.client.ws.ping);

    function pingEmoji(number) {
      if (number <= 10) {
        return "✨";
      } else if (number <= 50) {
        return "🟢";
      } else if (number <= 250) {
        return "🟡";
      } else if (number <= 500) {
        return "🔴";
      } else {
        return "💩";
      }
    }

    function pingResult(number) {
      if (number <= 10) {
        return "amazing";
      } else if (number <= 50) {
        return "great";
      } else if (number <= 250) {
        return "fine";
      } else if (number <= 500) {
        return "bad";
      } else {
        return "terrible";
      }
    }

    function pingColor(number) {
      if (number <= 10) {
        return 0xFFAC33;
      } else if (number <= 50) {
        return 0x79B059;
      } else if (number <= 250) {
        return 0xFCCA58;
      } else if (number <= 500) {
        return 0xDC2F44;
      } else {
        return 0xBF6952;
      }
    }

    const embed = new EmbedBuilder()
      .setColor(pingColor)
      .setTitle("Ping-pong! 🏓")
      .addFields(
        {
          name: `${pingEmoji(clientPing)} Client Ping`,
          value: clientPing.toString(),
          inline: true,
        },
        {
          name: `${pingEmoji(wsPing)} Websocket Ping`,
          value: wsPing.toString(),
          inline: true,
        },
        {
          name: "Results",
          value: `Overall, the ping is ${pingResult(
            Math.round(wsPing + clientPing / 2)
          )}.`,
        }
      );

    // Reply to the user with the latency
    await interaction.reply({ embeds: [embed] });
  },
};
