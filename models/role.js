const mongoose = require("mongoose");

function checkRoleName(value) {
    if (value === "user" || value === "admin") return true;
    return false;
}

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: checkRoleName,
        },

    },
    description: String,
});

module.exports = {
    roleSchema,
}