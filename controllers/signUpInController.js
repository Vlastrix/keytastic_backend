const bcrypt = require('bcrypt');
const {User} = require('../models/user.js')

const saltRounds = 1;

const signUp = (req, res) => {
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
}
// For View 
const signIn = (req, res) => {
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

}
module.exports =  {
    signUp,
    signIn
};