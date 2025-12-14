const express = require('express').Router();

const {getAllUsers}= require('../controllers/UserController.js');

express.get('/users', getAllUsers);

module.exports = express;