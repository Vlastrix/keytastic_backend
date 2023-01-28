require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
const {User} = require('./models/user.js')
const {Keyboard} = require('./models/keyboard.js')


app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const saltRounds = 1;

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDBUrl);


app.post("/signup", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            favoriteKeyboards: req.body.favoriteKeyboards,
        });
        newUser.save(function() {
            if (err) {
                console.log(err);
            } else {
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