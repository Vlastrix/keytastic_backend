const mongoose = require("mongoose");
const {roleSchema} = require("./role.js");

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: roleSchema,
    favoriteKeyboards: [String],
    isActive: Boolean,
});

const User = mongoose.model("User", usersSchema);

module.exports = {
    User,
}