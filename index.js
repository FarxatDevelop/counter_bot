require("./core/index");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express()
const { bot } = require("./core/bot");

mongoose.connect("mongodb+srv://Farkhat:developer1228@cluster0.liub89b.mongodb.net/counter_members_bot").then( async() => {
  app.use(
      await bot.createWebhook({
        domain: "https://counter_bot.onrender.com",
      })
    );
  app.listen(4000, () => console.log("Listening on port", 4000));
  bot.launch();
});
