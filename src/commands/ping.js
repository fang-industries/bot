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

    // Use different emojis for different pings
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

    // Determine what word to use for result
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

    // Define average ping
    const avgPing = Math.round(wsPing + clientPing / 2);

    // Variable for ping colours
    let pingColour;

    // Use a different embed colour for average ping
    if (avgPing <= 10) {
      pingColour = 0xffac33;
    } else if (avgPing <= 50) {
      pingColour = 0x79b059;
    } else if (avgPing <= 250) {
      pingColour = 0xfcca58;
    } else if (avgPing <= 500) {
      pingColour = 0xdc2f44;
    } else {
      pingColour = 0xbf6952;
    }

    // Create the ping embed
    const embed = new EmbedBuilder()
      .setColor(pingColour)
      .setTitle("Ping-pong! 🏓")
      .addFields(
        {
          name: `${pingEmoji(clientPing)} Client Ping`,
          value: clientPing.toString() + " ms",
          inline: true,
        },
        {
          name: `${pingEmoji(wsPing)} Websocket Ping`,
          value: wsPing.toString() + " ms",
          inline: true,
        },
        {
          name: "Results",
          value: `Overall, the average ping is ${pingResult(
            avgPing
          )}. (${avgPing} ms)`,
        }
      );

    // Reply to the user with the latency
    await interaction.reply({ embeds: [embed] });
  },
};
