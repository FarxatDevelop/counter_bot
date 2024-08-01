require("./core/index");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express()
const { bot } = require("./core/bot");

mongoose.connect(process.env.MONGO_DB).then(() => {
  app.use(
      await bot.createWebhook({
        domain: "https://counter_bot.onrender.com",
      })
    );
  app.listen(4000, () => console.log("Listening on port", 4000));
  bot.launch();
});
