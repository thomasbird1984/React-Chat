const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  created: { type: String },
  token: { type: String }
});

module.exports = mongoose.model("User", UserSchema);