const express = require("express");
const { db } = require("../db");
const { isJson, LoadSettings } = require("../lib");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let rows = await db.settings.findMany({
      select: { key: true, value: true },
    });
    rows.forEach((row) => {
      if (isJson(row.value)) row.value = JSON.parse(row.value);
    });
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Oops! some thing went wrong ¯\\_(ツ)_/¯");
  }
});

router.post("/", async (req, res) => {
  try {
    let { settings } = req.body;
    for (let setting of settings) {
      await db.settings.update({
        where: { key: setting.key },
        data: {
          value: isJson(setting.value)
            ? JSON.stringify(setting.value)
            : setting.value,
        },
      });
    }
    await LoadSettings();
    res.send("Updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    //res.status(500).send("Oops! some thing went wrong ¯\\_(ツ)_/¯");
  }
});

module.exports = router;
