
function error500() {
    res.status(500).send("Something went wrong...");
}

module.exports = {
    error500,
}