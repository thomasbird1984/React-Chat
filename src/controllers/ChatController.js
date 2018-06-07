const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/react-chat");

const ChatModel = require("../models/ChatModel");

class ChatController {
  addMessage(data) {
    console.log("chat data", data);
    const message = new ChatModel({
      userId: data.user._id,
      text: data.msg
    });
    message.save();

    if(message) {
      return message;
    } else {
      return false;
    }
  }
}

module.exports = ChatController;