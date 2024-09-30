const express = require('express');
const { obtenerInformacionJunta } = require('../controller/infojuntacontroller');

const router = express.Router();

// Ruta para obtener la información de la junta según el ID del usuario
router.get('/junta/usuario/:id_usuario', obtenerInformacionJunta);

module.exports = router;
