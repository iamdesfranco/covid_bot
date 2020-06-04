const https = require("https");
const fs = require("fs");
const cron = require("node-cron");
const { prefix, token, statUrl } = require("./config.json");

// HTTPS Function
const getData = (url) => {
  https.get(url, (res) => {
    res.setEncoding("utf8");
    let status = res.statusCode;
    console.log(status);
    let body = "";
    res.on("data", (data) => {
      body += data;
    });
    res.on("error", (e) => {
      console.log(e);
    });
    res.on("end", () => {
      if (status != 200) {
        console.log("Please try agian in 5 mins");
      } else {
        fs.writeFile(`./data/data.json`, body, "utf8", (err) => {
          if (err) {
            console.log(err);
          } else {
            // console.log("Covid Data saved");
            addLog(status);
          }
        });
      }
    });
  });
};

// Log File
let log = {
  data: [
    {
      date: new Date().toString(),
      status: 0,
    },
  ],
};

// LOG FUNCTION
const addLog = (status) => {
  fs.readFile("./data/log.json", "utf8", function readFileCallback(err, data) {
    // If file not found, create file
    // Else: Read file and update
    if (err) {
      let json = JSON.stringify(log);
      fs.writeFile("./data/log.json", json, "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          //   console.log("Log Data Saved");
        }
      });
    } else {
      let obj = JSON.parse(data);
      obj.data.push({ date: new Date().toString(), status: status });
      let json = JSON.stringify(obj);
      fs.writeFile("./data/log.json", json, "utf8", (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

// getData(statUrl);

// scheduler
cron.schedule("0 * * * *", () => {
  console.log("60 minutes");
  getData(statUrl);
});
