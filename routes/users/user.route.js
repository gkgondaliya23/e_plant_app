const express = require('express');
const router = express.Router();
const { signup, login, logout, updateUser } = require('../../controllers/users/user.controller');

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.post('/update-user', updateUser);
module.exports = router;