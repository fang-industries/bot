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
   * Description  : Pong!
   *
   * What it does : A basic ping command, it
   *                responds with the WS and
   *                cient ping.
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the Client and API Ping"),

  // Execute the command asynchronously
  async execute(interaction) {
    // Define the two pings
    const clientPing = Number(Date.now() - interaction.createdTimestamp);
    const wsPing = Number(Math.round(interaction.client.ws.ping));

    function pingEmoji(int) {
      if (int < 10) {
        return ":sparkles:";
      } else if (int > 10) {
        return "🟢";
      } else if (int > 50) {
        return "🟡";
      } else if (int > 200) {
        return "🔴";
      }
    }

    function pingResult(int) {
      if (int < 10) {
        return "amazing";
      } else if (int > 10) {
        return "great";
      } else if (int > 50) {
        return "fine";
      } else if (int > 200) {
        return "bad";
      }
    }

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Ping-pong! 🏓")
      .addFields(
        {
          name: `${pingEmoji(clientPing)} Client Ping`,
          value: clientPing,
          inline: true,
        },
        {
          name: `${pingEmoji(wsPing)} Websocket Ping`,
          value: wsPing,
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
