const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
