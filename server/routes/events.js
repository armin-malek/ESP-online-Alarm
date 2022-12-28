const express = require("express");
const { db } = require("../db");
const router = express.Router();
const pagination = require("pagination");
const { parseDateFull } = require("../lib");
const Rows = 20;

router.get("/", async (req, res) => {
  try {
    let { page, order } = req.query;

    if (order) {
      if (order.toLowerCase() != "asc" && order.toLowerCase() != "desc")
        return res.status(401).send("bad request - wrong order type");
    } else order = "asc";

    if (!page || page < 0) page = 1;
    let eventsCount = await db.events.count({ orderBy: { id: order } });

    var paginator = new pagination.TemplatePaginator({
      prelink: "/",
      current: page,
      rowsPerPage: Rows,
      totalResult: eventsCount,
      template: function () {
        return "";
      },
    });
    let pagData = paginator.getPaginationData();

    let events = await db.events.findMany({
      orderBy: { id: order },
      skip: parseInt(pagData.fromResult - 1),
      take: Rows,
    });

    events.map((item) => {
      item.date = parseDateFull(item.date);
    });
    res.json({
      data: events,
      pagination: {
        currentPage: pagData.current,
        pageCount: pagData.pageCount,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
    //res.status(500).send("Oops! some thing went wrong ¯\\_(ツ)_/¯");
  }
});

module.exports = router;
