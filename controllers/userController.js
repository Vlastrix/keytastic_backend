require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user.js')

const saltRounds = 1;

function checkForError(err, res) {
    if (err) {
        console.log(err);
        res.status(500).send("Something went wrong...");
        return true;
    }
    return false;
}

function createUser(username, email, hashedPassword, res) {
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        role: "user",
        favoriteKeyboards: [],
        isActive: true,
    });
    newUser.save();
    var jsonWebToken = jwt.sign({ user: newUser._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
    res.status(201).json({token: jsonWebToken});
}

const signUp = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, function(bcryptError, hashedPassword) {
        if (checkForError(bcryptError, res)) return res.end();
        User.exists({email: email}, function (searchError, foundUser) {
            if (checkForError(searchError, res)) return res.end();
            if (foundUser != null) return res.status(400).send("This email is already registered. Please enter another email.");
            createUser(username, email, hashedPassword, res);
        });
    });
}

const signIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(mongooseError, foundUser) {
        if (checkForError(mongooseError, res)) return res.end();
        if (foundUser === null) return res.status(404).send("This user does not exist. Please Sign Up.");
        if (foundUser.isActive === false) return res.status(403).send("This user is innactive.");
        bcrypt.compare(password, foundUser.password, function(bcryptError, result) {
            if (checkForError(bcryptError, res)) return res.end();
            if (!result) return res.status(400).send("Email or Password is incorrect.");
            var jsonWebToken = jwt.sign({ user: foundUser._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
            res.status(200).json({token: jsonWebToken});
        });
    });
}

const verifyToken = (req, res) => {
    const receivedToken = req.body.token;
    jwt.verify(receivedToken, process.env.JWT_SECRET, function(jsonWebTokenError, decoded) {
        if (jsonWebTokenError && jsonWebTokenError.name != "TokenExpiredError") return res.end();
        if (jsonWebTokenError.name === "TokenExpiredError") return res.status(200).send("Token expired.");
        res.status(200).send("Token validated!");
    });
}

module.exports = {
    signUp,
    signIn,
    verifyToken,
};