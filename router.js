const express = require('express');
const {signUp, signIn, verifyToken} = require('./controllers/userController');
const routesManager = express.Router();

routesManager.post('/signup', signUp);
routesManager.post('/signin', signIn);
routesManager.post('/verifytoken', verifyToken);
module.exports = routesManager;