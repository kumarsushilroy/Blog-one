
const express = require('express');

const router = express.Router();

const registerUser = require('../Controllers/UserController')

// register user...................................
router.route('/register/user').post(registerUser.register);

// get all user.......................................
router.route('/get/alluser').get(registerUser.getAlluser);

// Login route.......................................
router.route('/user/login').post(registerUser.loginUser);

module.exports = router;