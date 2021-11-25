const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    prefix: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model("Guild", guildSchema);