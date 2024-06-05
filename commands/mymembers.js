const { bot } = require("../core/bot");
const { referalGroups } = require("../Schema/schema");

bot.command("mymembers", async (msg) => {
  const currentGroupId = msg.update.message.chat.id;
  const currentUserId = msg.update.message.from.id;
  const currentUserName = msg.update.message.from.first_name;
  
  if (
    msg.update.message.chat.type == "group" ||
    msg.update.message.chat.type == "supergroup"
  ) {
    const currentGroup = await referalGroups.find({
      groupId: currentGroupId,
      userId: currentUserId,
    });
    if (currentGroup.length !== 0) {
      const refs = currentGroup[0].referalIds.length;
      if (refs) {
        msg.reply(
          `<a href="tg://user?id=${currentUserId}">${currentUserName}</a>, siz ${refs} adam qosqansiz`,
          { parse_mode: "HTML" }
        );
      } else {
        noPerson();
      }
    } else {
      noPerson();
    }
    async function noPerson() {
      msg.reply(
        `<a href="tg://user?id=${currentUserId}">${currentUserName}</a>, siz adam qospagansiz`,
        { parse_mode: "HTML" }
      );
    }
  } else {
    msg.reply("Bul buyriq tek toparda isleydi", {
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
    });
  }
});
