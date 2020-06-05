const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
// Config File
const { prefix, token, statUrl, faqUrl } = require("./config.json");

client.once("ready", () => {
  console.log("Ready!");
});

client.login(token);

client.on("message", (message) => {
  if (message.content === `${prefix}help`) {
    // HELP
    let msg = `:wave: **WELCOME TO COVIDSTAT BOT** :wave:\nMake use of the _prefix:${prefix}_ and the _universal country codes(ALPHA-2)_ to view stats.\n_Visit https://www.iban.com/country-codes to find country codes(ALPHA-2)\nEample: South Africa - !za | United Kingdom - !gb`;
    message.channel.send(msg);
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

        let statHeading = `:earth_africa: Global Data :earth_africa:`;
        let newConfirmed = `_New Confirmed:_ ${obj.Global.NewConfirmed}`;
        let totalConfirmed = `_Total Confirmed:_ ${obj.Global.TotalConfirmed}`;
        let newDeaths = `_New Deaths:_ ${obj.Global.NewDeaths}`;
        let totalDeaths = `_Total Deaths:_ ${obj.Global.TotalDeaths}`;
        let newRecoveries = `_New Recoveries:_ ${obj.Global.NewRecovered}`;
        let totalRecoveries = `_Total Recoveries:_ ${obj.Global.TotalRecovered}`;
        let msg = `${statHeading}\n${newConfirmed}\n${totalConfirmed}\n${newDeaths}\n${totalDeaths}\n${newRecoveries}\n${totalRecoveries}`;

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
              obj.Countries[i]["CountryCode"].indexOf(message.content.slice(1).toUpperCase()) != -1) {

              let countryFlag = `:flag_${obj.Countries[i]["CountryCode"].toLowerCase()}:`;
              let countryName = obj.Countries[i].Country;
              let statHeading = `${countryFlag} ${countryName} ${countryFlag}`
              let newConfirmed = `_New Confirmed:_ ${obj.Countries[i].NewConfirmed}`;
              let totalConfirmed = `_Total Confirmed:_ ${obj.Countries[i].TotalConfirmed}`;
              let newDeaths = `_New Deaths:_ ${obj.Countries[i].NewDeaths}`;
              let totalDeaths = `_Total Deaths:_ ${obj.Countries[i].TotalDeaths}`;
              let newRecoveries = `_New Recoveries:_ ${obj.Countries[i].NewRecovered}`;
              let totalRecoveries = `_Total Recoveries:_ ${obj.Countries[i].TotalRecovered}`;
              let faqMsg = `For any FAQ visit: ${faqUrl}`
              let msg = `${statHeading}\n${newConfirmed}\n${totalConfirmed}\n${newDeaths}\n${totalDeaths}\n${newRecoveries}\n${totalRecoveries}\n${faqMsg}`
              return message.channel.send(msg);
              // return console.log(obj.Countries[i]);
            }
          }
        }
      }
    });
  }
});
