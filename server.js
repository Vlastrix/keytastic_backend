const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
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

app.get("/singin", function(req, res) {
    res.send("Halo");
});

app.get("/singup", function(req, res) {
    res.send("Halo");
});

app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});