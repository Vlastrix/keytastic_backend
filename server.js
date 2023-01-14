
const express = require("express");
const app = express();
const port = process.env.PORT || 3000

app.get("/", function(req, res) {
    res.send("Halo");
});

app.listen(port, function() {
    console.log("Server started succesfully on port " + port);
});