const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/react-chat");

const ChatModel = require("../models/ChatModel");

class ChatController {
  addMessage(data) {
    console.log(data);
    const userId = Buffer.from(data.token).toString("base64").split("||")[0];
    const message = new ChatModel({
      userId: userId,
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