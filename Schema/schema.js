const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  username: { type: String },
});

const groupSchema = new Schema({
  groupId: { type: Number, required: true, unique: true },
  groupName: { type: String, required: true },
  groupType: String,
});

const referalGroupSchema = new Schema({
  groupName: { type: String, required: true },
  userId: { type: Number, require: true },
  groupId: { type: Number, require: true },
  referalIds: { type: Array },
});

const Users = model("users", userSchema);
const Groups = model("groups", groupSchema);
const referalGroups = model("referalGroups", referalGroupSchema);
module.exports = { Users, Groups, referalGroups };
