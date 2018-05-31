const express = require("express");
const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/react-chat");

const UserRouter = express.Router();
const UserModel = require("../models/UserModel");

UserRouter.route('/').get((req, res) => {console.log("UserRouter /");
    UserModel.find({}, (err, chats) => {
        res.json(chats);
    });
});

UserRouter.route("/create").post((req, res) => {
    const message = new UserModel(req.body);
    message.save();
    res.status(201).send(message);
});

UserRouter.route("/:id").get((req, res) => {console.log(`UserRouter /${req.params.id}`);
    UserModel.findOne({ id: req.params.id }, (err, chat) => {
        res.json(chat);
    });
});

module.exports = UserRouter;