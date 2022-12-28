const { db } = require("./db");
const { settings } = require("./settings");
const axios = require("axios");
const moment = require("moment-timezone");
const S = require("string");

async function LoadSettings() {
  try {
    let rows = await db.settings.findMany();
    rows.forEach((row) => {
      if (isJson(row.value)) row.value = JSON.parse(row.value);
      settings.set(row.key, row.value);
    });
    console.log("settings loaded:", rows.length);
  } catch (err) {
    console.log("Setting Load Err:", err);
  }
}

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

async function MessageAdmin(msg) {
  try {
    await axios.default.get(
      `https://api.telegram.org/bot${
        process.env.TG_TOKEN
      }/sendMessage?chat_id=${process.env.ADMIN_ID}&text=${encodeURI(msg)}`
    );
  } catch (err) {
    console.log(err);
  }
}
function isTimeBetween(startClock, encClock) {
  let start = moment(
    moment()
      .set("hours", startClock.split(":")[0])
      .set("seconds", startClock.split(":")[1]),
    "H:mm"
  ).tz("Asia/Tehran");
  let end = moment(
    moment()
      .set("hours", encClock.split(":")[0])
      .set("seconds", encClock.split(":")[1]),
    "H:mm"
  ).tz("Asia/Tehran");
  let server = moment(moment(), "H:mm").tz("Asia/Tehran");
  if (end < start) {
    return (
      (server >= start && server <= moment("23:59:59", "h:mm:ss")).tz(
        "Asia/Tehran"
      ) ||
      (server >= moment("0:00:00", "h:mm:ss").tz("Asia/Tehran") && server < end)
    );
  }
  return server >= start && server < end;
}

function gregorian_to_jalali(gy, gm, gd) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}
function parseDateFull(date) {
  if (date === null) return "";
  let d = new Date(date);
  let mom = moment(d);
  let ctime =
    gregorian_to_jalali(d.getFullYear(), d.getMonth() + 1, d.getDate()) +
    " " +
    mom.format("hh:mm:ss");
  ctime = S(ctime).replaceAll(",", "/").s;
  return ctime;
}

module.exports.LoadSettings = LoadSettings;
module.exports.isJson = isJson;
module.exports.MessageAdmin = MessageAdmin;
module.exports.isTimeBetween = isTimeBetween;
module.exports.parseDateFull = parseDateFull;
