const bcrypt = require('bcrypt');
const {User} = require('../models/user.js')

const saltRounds = 1;

const signUp = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(bcryptError, hash) {
        if (bcryptError) {
            console.log(bcryptError);
            res.status(500).send("Something went wrong...");
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                favoriteKeyboards: req.body.favoriteKeyboards,
                isActive: true,
            });
            newUser.save(function() {
                res.status(200).send("Sing Up success!");
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
            res.status(404).send("This user does not exist.");
        } else if (foundUser.isActive === false) {
            res.status(403).send("This user is innactive.");
        } else {
            bcrypt.compare(password, foundUser.password, function(bcryptError, result) {
                if (bcryptError) {
                    console.log(bcryptError);
                    res.status(500).send("Something went wrong...");
                } else if (result === true) {
                    res.status(200).send("Sing In success!");
                } else {
                    res.status(400).send("Email or Password is incorrect.");
                }
            });
        }
    });
}

module.exports =  {
    signUp,
    signIn
};