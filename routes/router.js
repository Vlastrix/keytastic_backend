const express = require('express');
const {signUp, signIn } = require('../controllers/signUpInController');
const routerManager = express.Router();

routerManager.post('/signup', signUp);
routerManager.post('/signin', signIn);
module.exports = routerManager;