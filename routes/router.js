const express = require('express');
const {signUp, signIn} = require('../controllers/signUpInController');
const routesManager = express.Router();

routesManager.post('/signup', signUp);
routesManager.post('/signin', signIn);
module.exports = routesManager;