const express = require('express');
const router = express.Router();
const creacionjuntacontroller = require('../controller/crearjuntacontroller');

router.post('/creacionjunta', creacionjuntacontroller.creacionjunta);

module.exports = router;