/*
 * This is the /light command. It controls the lights
 * in Jason's room over the Tuya API.
 *
 * Some parts of code are taken from Tuya's sign request
 * documentation, available here:
 *
 * https://developer.tuya.com/en/docs/iot/singnature?id=Ka43a5mtx1gsc
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const crypto = require("crypto");
const { getToken, encryptStr } = require("../miscellaneous/helpers/tuya");
require("dotenv").config();

// Export the command data for loader
module.exports = {
  /*
   * Command      : /light
   *
   * Sub-command  : /light on
   * Description  : Turns on the light
   *
   * Sub-command  : /light off
   * Description  : Turns off the light
   *
   * Sub-command  : /light set [colour]
   * Description  : Sets the light to a colour
   *
   * What it does : Self descriptive, it controls
   *                the lights in Jason's room
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("light")
    .setDescription("Controls lights in Jason's room.")
    .addSubcommand((c) =>
      c.setName("off").setDescription("Turns off Jason's bedroom light.")
    )
    .addSubcommand((c) =>
      c.setName("on").setDescription("Turns on Jason's bedroom light.")
    )
    .addSubcommand((c) =>
      c.setName("set").setDescription("Sets Jason's bedroom light to a colour.")
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    // If the subcommand is off
    if (interaction.options.getSubcommand() === "off") {
      const token = await getToken();

      // Define Tuya API endpoint
      const tuyaOpenAPI =
        require("../../config.json").misc.tuya_openapi.replace(
          "{{DEVICE_ID}}",
          process.env.TUYA_DEVC
        );

      // What to send to API
      const body = {
        commands: [
          { code: "colour_data_v2", value: { h: 360, s: 1000, v: 1000 } },
        ],
      };

      // Set t to current unix epoch time
      const t = Date.now().toString();

      // Hashed body content
      const contentHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(body))
        .digest("hex");

      // String to sign
      const stringToSign = ["POST", contentHash, "", tuyaOpenAPI].join("\n");

      // Signed string should be composed of this
      const signStr = process.env.TUYA_ACCS + token + t + stringToSign;

      // Define API headers
      const headers = {
        sign_method: "HMAC-SHA256",
        client_id: process.env.TUYA_ACCS,
        t: t,
        sign: await encryptStr(signStr, process.env.TUYA_SECR),
        access_token: token,
      };

      console.log(headers);

      // Send the command to Tuya API
      const response = await fetch(tuyaOpenAPI, {
        method: "POST",
        headers: headers,
        body: body,
      });

      // Get the response data after
      const data = await response.json();

      console.log(data);
    }
  },
};
