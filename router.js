const express = require('express');
const {signUp, signIn} = require('./controllers/userController');
const routesManager = express.Router();

routesManager.post('/signup', signUp);
routesManager.post('/signin', signIn);
module.exports = routesManager;