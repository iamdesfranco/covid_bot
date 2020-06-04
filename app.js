const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
// Config File
const { prefix, token, statUrl } = require("./config.json");

client.once("ready", () => {
  console.log("Ready!");
});

client.login(token);

client.on("message", (message) => {
  if (message.content === `${prefix}ping`) {
    message.channel.send("Pong");
  } else if (message.content === `${prefix}pong`) {
    message.channel.send("Ping");
  } else if (message.content === `${prefix}help`) {
    // HELP
    fs.readFile("./data/data.json", "utf8", function readFileCallback(
      err,
      data
    ) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data);
        // :flag_countrycode:
        let msg = `Welcome to GrootspookBot\nType the following commands to view cases:\n:globe_with_meridians: Global: !global`;
        for (let i = 0; i < 5; i++) {
          msg += `\n:flag_${obj.Countries[i]["CountryCode"].toLowerCase()}: ${
            obj.Countries[i]["Country"]
          }: !${obj.Countries[i]["CountryCode"].toLowerCase()}`;
        }
        return message.channel.send(msg);
      }
    });
    // HELP
  } else if (message.content.toLowerCase() === `${prefix}global`) {
    fs.readFile("./data/data.json", "utf8", function readFileCallback(
      err,
      data
    ) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data);
        let msg = `:globe_with_meridians: Global Cases :globe_with_meridians:\nTotal Cases: ${obj.Global.TotalConfirmed}\nNew Confirmed: ${obj.Global.NewConfirmed}\nNew Recoveries: ${obj.Global.NewRecovered}\nTotal Recovered: ${obj.Global.TotalRecovered}`;
        message.channel.send(msg);
      }
    });
  } else {
    fs.readFile("./data/data.json", "utf8", function readFileCallback(
      err,
      data
    ) {
      if (err) {
        console.log(err);
      } else {
        let obj = JSON.parse(data);
        for (let i = 0; i < obj.Countries.length; i++) {
          for (key in obj.Countries[i]) {
            if (
              obj.Countries[i]["CountryCode"].indexOf(
                message.content.slice(1).toUpperCase()
              ) != -1
            ) {
              let msg = `:flag_${obj.Countries[i][
                "CountryCode"
              ].toLowerCase()}: ${
                obj.Countries[i].Country
              } :flag_${obj.Countries[i][
                "CountryCode"
              ].toLowerCase()}:\nTotal Cases: ${
                obj.Countries[i].TotalConfirmed
              }\nTotal Cases: ${obj.Countries[i].NewConfirmed}\nTotal Cases: ${
                obj.Countries[i].NewRecovered
              }\nTotal Cases: ${obj.Countries[i].TotalRecovered}`;
              return message.channel.send(msg);
              // return console.log(obj.Countries[i]);
            }
          }
        }
      }
    });
  }
});
