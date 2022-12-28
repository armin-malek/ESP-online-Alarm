if (process.env.NODE_ENV !== "production") {
  console.log("Local");
  require("dotenv").config();
} else {
  console.log("Production");
}
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { db } = require("./db");
const moment = require("moment");
const { settings } = require("./settings");
const { LoadSettings, MessageAdmin, isTimeBetween } = require("./lib");
const io = new Server(server);

app.use(
  cors({
    origin: [
      "http://localhost:*",
      "http://localhost:8081",
      "https://client-iot.iran.liara.run",
      "http://client-iot.iran.liara.run",
      "https://esp.iran.liara.run",
      "http://esp.iran.liara.run",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());

app.use(require("./routes/index"));

io.on("connection", (socket) => {
  console.log("a device connected");

  socket.on("movement", async (data) => {
    try {
      let ServiceActive = settings.get("ServiceActive");
      if (ServiceActive == "false") return;

      let activeTime = settings.get("ActiveTime");

      if (!isTimeBetween(activeTime.from, activeTime.to)) return;

      let time = moment().toISOString();
      let event = await db.events.create({
        data: {
          date: time,
          Device: {
            connectOrCreate: {
              where: { mac: data.mac },
              create: { dateRegister: time, mac: data.mac },
            },
          },
        },
      });
      console.log(`${event.id} ${event.date}`, data);
    } catch (err) {
      console.log(err);
    }
    await MessageAdmin(`Detected Movement!`);
  });
});

server.listen(3000, async () => {
  console.log("listening on *:3000");
  await LoadSettings();
});
