const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const stocks = require("./routes/api/stocks");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

let origin;
if (process.env.NODE_ENV === "production") {
  origin = "https://stockify.herokuapp.com";
} else {
  origin = "http://localhost:3000";
}

const corsOptions = {
  origin: origin,
};

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/stocks", stocks);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));
