const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
mongoose.connect(mongoDBUrl);

// Items Schema
const itemsSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your To Do List!"
});

app.get("/singin", function(req, res) {
    res.send("Halo");
});

app.get("/singup", function(req, res) {
    res.send("Halo");
});

app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});