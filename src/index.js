/*
 * The main bot file, it handles events and logins to the
 * Discord API
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules and load from .env file
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("../config.json");
require("dotenv").config();

// Clear the console when started
console.clear();

// Create a new client and a collection for the commands
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();

// Call the command and event loader
require("./miscellaneous/loader/command")(client);
require("./miscellaneous/loader/event")(client);

// Finally, login to the Discord API
client.login(process.env.BOT_TOKEN);

// Preventing exits on crashes
process.on("unhandledRejection", (e) => {
  // Log the error to console
  console.error(e);

  // Log to error to debug channel
  const channel = client.channels.cache.get(config.bot.debug);
  channel.send(`I've ran into an issue! Check this out:\n\`\`\`${e}\`\`\``);
});
