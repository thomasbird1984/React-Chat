const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  id: { type: Number },
  userId: { type: String },
  text: { type: String },
  created: { type: String, default: new Date() }
});

module.exports = mongoose.model("Chat", ChatSchema);