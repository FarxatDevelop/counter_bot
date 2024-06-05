const { Users } = require("../Schema/schema");
const { bot } = require("../core/bot");

bot.start(async (msg) => {
  if (msg.update.message.chat.type == "private") {
    let { id, username, first_name } = msg.update.message.from;
    const isHave = await Users.findOne({ id });

    if (!isHave) {
      username = username || "joq";
      Users.create({ id, username, first_name });
      bot.telegram.sendMessage(
        "1358716538",
        `Jana paydaliwshi🥳
Ati: ${first_name}
Username: @${username}`
      );
    } else {
      isHave.first_name = first_name;
      isHave.username = username;
      await isHave.save();
    }

    msg.reply(
      `👋 Assalawma aleykum, <a href="tg://user?id=${id}">${first_name}</a>
🤖 Botimizga xosh kelipsiz
🫡 Meni toparga qozin`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Toparga qosiw",
                url: "https://t.me/f_membersCounterBot?startgroup=new",
              },
            ],
          ],
        },
      }
    );
  }
});
