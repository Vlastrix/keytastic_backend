require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

// Database connection
const mongoDBUrl = process.env.MONGODBURL;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDBUrl);

app.use('/', require('./router'));

app.listen(PORT, function() {
    console.log("Server started succesfully on port " + PORT);
});