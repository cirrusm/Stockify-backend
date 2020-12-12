const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stocks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
  },
});
const User = mongoose.model("users", UserSchema);

module.exports = User;
