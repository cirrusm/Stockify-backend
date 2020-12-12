const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Stock = require("../../models/Stock");

//ALL INSTANCES OF STOCK PURCHASES (NOT USER DEPENDENT) (TEMPORARY PORTFOLIO PAGE)
router.get("/", (req, res) => {
  Stock.find({}, (err, allStocks) => {
    if (err) return console.log(err);
    res.json({ stocks: allStocks });
  }).catch((err) => {
    console.log("error loading portfolio");
    res.json({ Error: "Error fam" });
  });
});

//buy stock / create stock
router.post("/", (req, res) => {
  Stock.create(req.body)
    .then((savedStock) => {
      res.json({ stock: savedStock });
    })
    .catch((err) => {
      console.log("Error buying this stock");
      res.json({ Error: "unable to buy stock" });
    });
});

//sell / delete stock
router.delete("/:id", (req, res) => {
  Stock.findByIdAndDelete(req.params.id, (err, soldStock) => {
    if (err) console.log("error");
    res.json(soldStock + "deleted");
  });
});

module.exports = router;
