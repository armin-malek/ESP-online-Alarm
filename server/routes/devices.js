const express = require("express");
const { db } = require("../db");
const { parseDateFull } = require("../lib");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let devices = await db.device.findMany();
    devices.map((item) => {
      item.dateRegister = parseDateFull(item.dateRegister);
    });
    res.json(devices);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    //res.status(500).send("Oops! some thing went wrong ¯\\_(ツ)_/¯");
  }
});

module.exports = router;
