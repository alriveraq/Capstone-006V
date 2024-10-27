const express = require('express');
const router = express.Router();
const reunioncontroller = require('../controller/reunioncontroller');


router.post('/reunion/crearreunion', reunioncontroller.crearReunion);

router.post('/reunion/registrarasistencia', reunioncontroller.registrarasistencia);

router.get('/reunion/reuniones/:id_usuario', reunioncontroller.obtenerReunionescontroller);

module.exports = router;