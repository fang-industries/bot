/*
 * This is the /daily command. It responds what's going
 * on today, COVID stats, today's lessons, and chicken verses!
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import the required modules
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

// Export the command data for loader
module.exports = {
  /*
   * Command      : /daily
   * Description  : Returns with the current time and date.
   *
   * What it does : A basic clock command, it
   *                returns the current date
   *                and time, forced in UTC+7
   */

  // Define data for loader
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Returns with the current time and date.")
    .addStringOption((opt) =>
      opt
        .setName("timezone")
        .setDescription("Use a different timezone for the output")
    )
    .addStringOption((opt) =>
      opt
        .setName("location")
        .setDescription("Use a different location for the output")
    ),

  // Execute the command asynchronously
  async execute(interaction) {
    // Create a new date object
    const clock = new Date();

    // Define the timezone given from user input, otherwise use config.
    const timezone = interaction.options.getString("timezone")
      ? interaction.options.getString("timezone")
      : require("../../config.json").misc.timezone;

    // Define the location given from user input, otherwise use config.
    const location = interaction.options.getString("location")
      ? interaction.options.getString("location")
      : require("../../config.json").misc.location;

    // Fetches from APIs
    const weather = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWTRMP}&units=metric`
    ).then((res) => res.json());

    const covid = await fetch(
      `https://disease.sh/v3/covid-19/countries/ID`
    ).then((res) => res.json());

    // Definition for different properties
    const time = clock
      .toLocaleTimeString("en-GB", {
        timezone,
      })
      .slice(0, 5);
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = weekday[clock.getDay()];
    const greeting = () => {
      const hour = clock.getHours();

      if (hour >= 16) {
        return "evening";
      } else if (hour >= 12) {
        return "afternoon";
      } else if (hour >= 0) {
        return "morning";
      }
    };
    const greetingImage = () => {
      const hour = clock.getHours();

      if (hour >= 20) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/night-with-stars_1f303.png";
      } else if (hour >= 18) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/cityscape-at-dusk_1f306.png";
      } else if (hour >= 16) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/sunset_1f307.png";
      } else if (hour >= 12) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/cityscape_1f3d9-fe0f.png";
      } else if (hour >= 6) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/sunrise_1f305.png";
      } else if (hour >= 0) {
        return "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/night-with-stars_1f303.png";
      }
    };

    // Emojis for different weather
    const weatherEmoji = () => {
      switch (weather.weather[0].main) {
        case "Thunderstorm":
          return "⛈";
        case "Drizzle":
          return "🌧";
        case "Rain":
          return "🌦";
        case "Snow":
          return "❄";
        case "Atmosphere":
          return "🌫";
        case "Clear":
          return "☀";
        case "Clouds":
          return "🌥";
        default:
          return "🌡";
      }
    };

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Good ${greeting()}, ${interaction.member.displayName}!`,
        iconURL: greetingImage(),
      })
      .setTitle(`It is currently ${time} on a ${day}.`)
      .setDescription(
        "This command is currently a work-in-progress! Please be patient."
      );

    embed.addFields({
      name: `${weatherEmoji()} Weather`,
      value: `It is currently \`${weather.main.temp
        .toString()
        .slice(0, 2)}°C\` with a wind speed of \`${weather.wind.speed} m/s\`.`,
    });

    embed.addFields({
      name: `🦠 COVID-19`,
      value: `There are ${covid.todayCases.toLocaleString(
        "en-GB"
      )} new Coronavirus cases today.`,
    });

    // Reply to the user with the current time.
    await interaction.reply({ embeds: [embed] });
  },
};
