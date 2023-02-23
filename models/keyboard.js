const mongoose = require("mongoose");

const keyboardsSchema = new mongoose.Schema({
    name: String,
    markedFavoriteCount: Number,
    viewsCount: Number,
    brandName: String,
    compatibleDevices: [String],
    connectionTechnology: String,
    buildTypes: [String],
    size: String,
    layout: String,
    backlight: String,
    backlightDirection: String,
    chasisColors: [String],
    material: String,
    switchTypes: [String],
    switchNames: [String],
    keycapType: String,
});

const Keyboard = mongoose.model("Keyboard", keyboardsSchema);

module.exports = {
    Keyboard,
}