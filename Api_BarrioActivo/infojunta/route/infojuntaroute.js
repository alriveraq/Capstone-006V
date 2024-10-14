const express = require('express');
const infojuntacontroller = require('../controller/infojuntacontroller');
const router = express.Router();

// Ruta para obtener la información de la junta según el ID del usuario
router.get('/info/junta/:id_usuario', infojuntacontroller.obtenerInformacionJunta);


router.get('/juntas', infojuntacontroller.obtenerTodasLasJuntasController);


router.post('/junta/solicitar', infojuntacontroller.solicitarUnionJuntaController);


module.exports = router;
