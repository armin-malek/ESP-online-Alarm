const express = require("express");
const router = express.Router();

router.use("/devices", require("./devices"));
router.use("/events", require("./events"));
router.use("/settings", require("./settings"));

router.get("/", (req, res) => {
  res.send("ok");
});

module.exports = router;
