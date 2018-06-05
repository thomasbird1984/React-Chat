const express = require("express");
const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/react-chat");

const ChatRouter = express.Router();
const ChatModel = require("../models/ChatModel");

ChatRouter.route('/').get((req, res) => {console.log("MessageRouter /");
    ChatModel.find({}, (err, chats) => {
        res.json(chats);
    }).sort({created: "desc"});
});

ChatRouter.route("/create").post((req, res) => {
    const message = new ChatModel(req.body);
    message.save();
    res.status(201).send(message);
});

ChatRouter.route("/:id").get((req, res) => {console.log(`MessageRouter /${req.params.id}`);
    ChatModel.findOne({ id: req.params.id }, (err, chat) => {
        res.json(chat);
    });
});

module.exports = ChatRouter;