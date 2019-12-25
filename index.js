require("dotenv").config();
const Schedule = require("node-schedule");
const Discord = require("discord.js");
const http = require("http");
const express = require("express");
const leagueInfo = require("./tft/league-info");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// client.on('message', msg => {
// //Fairly ugly way to see if runespirit has replied with tier list, then react for items
//   if (msg.author.username === 'Runespirit' &&
//     msg.embeds && msg.embeds[0].description.includes('tierlist')) {
//   }
// })

//client.login(process.env.BOT_TOKEN)

const tftRankingsEmbed = {
  title: "__Bronze is the new gold__",
  description: "Updated daily:fire:",
  url: "https://discordapp.com",
  color: 16742406,
  timestamp: "2019-12-25T16:57:17.270Z",
  footer: {
    icon_url: "https://i.imgur.com/KJ6Xa5A.jpg",
    text: "Orange-bot"
  },
  image: {
    url:
      "https://mobalytics.gg/wp-content/uploads/1999/07/Featherknight-Pengu-splash.jpg"
  },
  author: {
    name: "TFT Rankings",
    url: "https://discordapp.com",
    icon_url: "https://i.imgur.com/KJ6Xa5A.jpg"
  },
  fields: [
    {
      name: "----------------:first_place:----------------",
      value: "[**Lunar**](https://test.com)\nSilver II\n*12 Wins, 3 Losses*"
    },
    {
      name: "----------------:second_place:----------------",
      value: "[**Nizz**](https://test.com)\nSilver I\n*10 Wins, 3 Losses*"
    },
    {
      name: "----------------:third_place:----------------",
      value: "//"
    }
  ]
};
//channel.send({ embed });

leagueInfo.getFriendsInfo(function(result) {
  console.log(result);
});

Schedule.scheduleJob("0 17 * * *", function() {
  console.log("Running !r cron job");
  const tftChannel = client.channels.get("659065267095076864");
  const currentDate = new Date();
  tftChannel.send(
    `!r tierlist\n> TFT Item/Champs Tierlist ${currentDate.getDate()}/${currentDate.getMonth() +
      1}/${currentDate.getFullYear()}`
  );
  tftChannel.send(
    `!r teamcomps\n> TFT Team Comps ${currentDate.getDate()}/${currentDate.getMonth() +
      1}/${currentDate.getFullYear()}`
  );
});
