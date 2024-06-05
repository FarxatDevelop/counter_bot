require("./core/index");
require("dotenv").config();
const mongoose = require("mongoose");
const { bot } = require("./core/bot");

mongoose.connect(process.env.MONGO_DB).then(() => {
  bot.launch();
});
