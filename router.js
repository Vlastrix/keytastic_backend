const express = require('express');
const {signUp, signIn, verifyToken, addKeyboard} = require('./controllers/userController');
const routesManager = express.Router();

routesManager.post('/signup', signUp);
routesManager.post('/signin', signIn);
routesManager.post('/verifytoken', verifyToken);
routesManager.post('/addkeyboard', addKeyboard);
module.exports = routesManager;