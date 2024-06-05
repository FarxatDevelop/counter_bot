require("dotenv").config();
const { Telegraf } = require("telegraf");
const { Groups, referalGroups } = require("../Schema/schema");
const bot = new Telegraf(process.env.TOKEN);

// On methods

bot.on("my_chat_member", async (msg) => {
  const groupID = msg.update.my_chat_member.chat.id;
  const groupNAME = msg.update.my_chat_member.chat.title;
  const groupTYPE = msg.update.my_chat_member.chat.type;

  let currentGroup = await Groups.findOne({ groupId: groupID });

  if (!currentGroup) {
    Groups.create({
      groupId: groupID,
      groupName: groupNAME,
      groupType: groupTYPE,
    });
  } else {
    currentGroup.groupName = groupNAME;
    currentGroup.groupType = groupTYPE;
    await currentGroup.save();
  }
  if (msg.update.my_chat_member.new_chat_member.status == "member") {
    bot.telegram.sendMessage(groupID, "Magan admin berin");
  } else if (
    msg.update.my_chat_member.new_chat_member.status == "administrator"
  ) {
    bot.telegram.sendMessage(groupID, "Admin ushin raxmet");
  }
  if (msg.update.my_chat_member.new_chat_member.status == "left") {
    await Groups.deleteOne({ groupId: groupID });
  }
});

bot.on("new_chat_members", async (msg) => {
  const groupID = msg.update.message.chat.id;
  const groupName = msg.update.message.chat.title;
  const addedUserID = msg.update.message.from.id;
  const newChatMembers = msg.update.message.new_chat_members;

  const currentGroups = await referalGroups.find({
    groupId: groupID,
    userId: addedUserID,
  });
  if (currentGroups.length !== 0) {
    for (let i = 0; i < newChatMembers.length; i++) {
      const newMember = newChatMembers[i];
      currentGroups[0].referalIds.push(newMember);
      await currentGroups[0].save();
    }
  } else {
    referalGroups.create({
      groupName: groupName,
      userId: addedUserID,
      groupId: groupID,
      referalIds: newChatMembers,
    });
  }
});

bot.telegram.setMyCommands([
  {
    command: "start",
    description: "Baslaw",
  },
  {
    command: "statistika",
    description: "Bot statistikasin aliw",
  },
  {
    command: "mymembers",
    description: "Men neshe adam qostim",
  },
]);

module.exports = { bot };
