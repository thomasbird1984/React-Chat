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

UserRouter.route("/login").post((req, res) => {console.log("login");
  const creds = req.body;
  let user = UserModel.findOne({ email: req.body.email }, (err, user) => {
    if(user && user.password === req.body.password) {
      const timestamp = new Date();
      const token = Buffer.from(`${user.id}||${timestamp}`).toString("base64");

      delete user.password;

      // send token back
      UserModel.update({ _id: user._id }, { token: token }, (err, updated) => {
        res.json({
          token: token,
          user: user
        });
      });
    } else {
      res.status(404).send({ errors: true, msg: ["Passwords did not match"]});
    }
  });
});

UserRouter.route("/create").post((req, res) => {
    const message = new UserModel(req.body);
    message.save();
    res.status(201).send(message);
});

UserRouter.route("/:id").get((req, res) => {console.log(`UserRouter /${req.params.id}`);
    UserModel.findById(req.params.id, (err, chat) => {
        res.json(chat);
    });
});

module.exports = UserRouter;