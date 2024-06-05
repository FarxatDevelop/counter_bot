const { Users, Groups } = require("../Schema/schema");
const { bot } = require("../core/bot");

bot.command("statistika", async (msg) => {
  const statUser = (await Users.find({})).length;
  const statGroup = (await Groups.find({})).length;
  msg.reply(`📊Bot statistikası
👤 Users: ${statUser}
👥 Groups: ${statGroup}`);
});
