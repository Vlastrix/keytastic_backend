require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const saltRounds = 1;

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDBUrl);

// User Schema
const usersSchema = new mongoose.Schema({
    f_name: String,
    email: String,
    password: String,
    fav_keyboards: Array,
});

//Keyboard Schema
const keyboardsSchema = new mongoose.Schema({
    name: String,
    markedFav: Number,
    views: Number,
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
const Keyboard = mongoose.model("Keyboard", keyboardsSchema);

app.post("/signup", function(req, res) {
    console.log(req.body.f_name);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.fav_keyboards);
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            f_name: req.body.f_name,
            email: req.body.email,
            password: hash,
            fav_keyboards: req.body.fav_keyboards,
        });
        newUser.save(function() {
            if (err) {
                console.log(err);
            } else {
                console.log("User added successfully");
                res.send("Sign Up success!");
            }
        });
    });
});

app.post("/signin", function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(err, foundUser){
        if (err) {
            console.log(err)
        } else {
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if (result === true) {
                    res.send("Sing In success!");
                }
            });
        }
    });

});


app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});