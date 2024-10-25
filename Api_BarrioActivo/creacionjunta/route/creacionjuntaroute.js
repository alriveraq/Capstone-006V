const express = require('express');
const router = express.Router();
const creacionjuntacontroller = require('../controller/crearjuntacontroller');

router.post('/creacionjunta', creacionjuntacontroller.creacionjunta);

router.post('/junta/crearpublicacion', creacionjuntacontroller.crearpublicacion);

module.exports = router;