require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt');
const app = express();

const port = process.env.PORT || 3000;
const saltRounds = 10;

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDBUrl);

// User Schema
const usersSchema = new mongoose.Schema({
    f_name: String,
    email: String,
    password: String,
    fav_keyboards: [],
});

//Keyboard Schema
const keyboardsSchema = new mongoose.Schema({
    name: String,
    markedFav: int,
    views: int,
    brand: String,
    comp_devices: Array,
    conn_tech: String,
    size: String,
    layout: String,
    backlight: String,
    backlight_direction: String,
    colors: Array,
    material: String,
    switch_type: String,
    switch_name: String,
    keycap_type: String,
});


const User = mongoose.model("User", usersSchema);
const Keyboard = mongoose.model("Keyboard", keyboardsSchema)


app.post("/singup", function(req, res) {
    
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
    });
    res.send("Sign Up service");
});

app.post("/singin", function(req, res) {
    res.send("Sing In service");
});


app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});