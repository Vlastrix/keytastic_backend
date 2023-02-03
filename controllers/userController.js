const bcrypt = require('bcrypt');
const {User} = require('../models/user.js')
const {error500} = require('./errorController.js')

const saltRounds = 1;

const signUp = (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                favoriteKeyboards: req.body.favoriteKeyboards,
                isActive: true,
            });
            newUser.save(function() {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send("Sing Up success!");
                }
            });
        });
    } catch (error) {
        error500();
    }
}

const signIn = (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email: email}, function(err, foundUser){
            if (err) {
                console.log(err);
            } else if (foundUser === null) {
                res.status(404).send("This user does not exist.");
            } else if (foundUser.isActive === false) {
                res.status(403).send("This user is innactive.");
            } else {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result === true) {
                        res.status(200).send("Sing In success!");
                    } else {
                        res.status(400).send("Email or Password is incorrect.");
                    }
                });
            }
        });
    } catch (error) {
        error500();
    }
}

module.exports =  {
    signUp,
    signIn
};