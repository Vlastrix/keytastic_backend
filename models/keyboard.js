const mongoose = require("mongoose");

const keyboardsSchema = new mongoose.Schema({
    name: String,
    markedFavoriteCount: Number,
    viewsCount: Number,
    brandName: String,
    compatibleDevices: [String],
    connectionTechnology: String,
    buildType: String,
    size: String,
    layout: String,
    backlight: String,
    backlightDirection: String,
    availableChasisColors: [String],
    material: String,
    switchType: String,
    switchName: String,
    keycapType: String,
});

const Keyboard = mongoose.model("Keyboard", keyboardsSchema);

module.exports = {
    Keyboard,
}