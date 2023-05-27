const express = require('express')
const router = express.Router();
const UserController = require('./controllers/appApi/UserController');


// For mobile app
router.post('/login',UserController.login);

module.exports = router