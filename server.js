require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt');
const app = express();

const port = process.env.PORT || 3000;

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

const User = mongoose.model("User", usersSchema);

// Example
// const user1 = new User({
//     f_name: 'Vlad',
//     email: 'vladitrolo23@hotmail.com',
//     password: 'a hash to store in the db',
//     fav_keyboards: ['id of the keyboards marked favorite'],
// });

app.post("/singup", function(req, res) {
    res.send("Sign Up service");
});

app.post("/singin", function(req, res) {
    res.send("Sing In service");
});


app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});