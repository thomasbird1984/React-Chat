const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  id: { type: Number },
  userId: { type: String },
  text: { type: String },
  created: { type: String, default: Math.round((new Date()).getTime() / 1000) }
});

module.exports = mongoose.model("Chat", ChatSchema);