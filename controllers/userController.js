require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user.js')

const saltRounds = 1;

const signUp = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(bcryptError, hash) {
        if (bcryptError) {
            console.log(bcryptError);
            res.status(500).send("Something went wrong...");
        } else {
            User.exists({email: req.body.email}, function (searchError, searchResult) {
                if (searchError) {
                    console.log(searchError);
                    res.status(500).send("Something went wrong...");
                } else {
                    if (searchResult != null) {
                        res.status(400).send("This email is already registered. Please enter another email.");
                    } else {
                        const newUser = new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            favoriteKeyboards: [],
                            isActive: true,
                        });
                        newUser.save();
                        var jsonWebToken = jwt.sign({ user: newUser._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
                        res.status(201).json({token: jsonWebToken});
                    }
                }
            });


        }
    });
}

const signIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, function(mongooseError, foundUser){
        if (mongooseError) {
            console.log(mongooseError);
            res.status(500).send("Something went wrong...");
        } else if (foundUser === null) {
            res.status(404).send("This user does not exist. Please Sign Up.");
        } else if (foundUser.isActive === false) {
            res.status(403).send("This user is innactive.");
        } else {
            bcrypt.compare(password, foundUser.password, function(bcryptError, result) {
                if (bcryptError) {
                    console.log(bcryptError);
                    res.status(500).send("Something went wrong...");
                } else if (result === true) {
                    var jsonWebToken = jwt.sign({ user: foundUser._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
                    res.status(200).json({token: jsonWebToken});
                } else {
                    res.status(400).send("Email or Password is incorrect.");
                }
            });
        }
    });
}

const verifyToken = (req, res) => {
    const receivedToken = req.body.token;
    jwt.verify(receivedToken, process.env.JWT_SECRET, function(jsonWebTokenError, decoded) {
        if (jsonWebTokenError) {
            console.log(jsonWebTokenError);
            if (jsonWebTokenError.name === "TokenExpiredError") {
                res.status(200).send("Token expired.");
            }
            res.status(500).send("Something went wrong...");
        } else {
            res.status(200).send("Token validated!");
        }
    });
}

module.exports =  {
    signUp,
    signIn,
    verifyToken,
};