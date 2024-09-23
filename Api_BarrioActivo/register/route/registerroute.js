const express = require('express');
const router = express.Router();
const registercontroller = require('../controller/registercontroller');

router.post('/register', registercontroller.register);

module.exports = router;