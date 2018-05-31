const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    id: { type: Number },
    text: { type: String },
    created: { type: String }
});

module.exports = mongoose.model("Chat", ChatSchema);