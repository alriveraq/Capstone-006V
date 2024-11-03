const express = require('express');
const router = express.Router();
const votacionescontroller = require('../controller/votacionescontroller');

router.post('/votaciones/crearvotacion', votacionescontroller.crearVotacion);

router.post('/votaciones/registrarvoto', votacionescontroller.registrarVotoController);

router.get('/votaciones/obtenervotaciones/:id_usuario', votacionescontroller.obtenerVotacionesController);


module.exports = router;