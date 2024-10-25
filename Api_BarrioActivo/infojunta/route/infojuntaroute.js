const express = require('express');
const infojuntacontroller = require('../controller/infojuntacontroller');
const router = express.Router();

// Ruta para obtener la información de la junta según el ID del usuario
router.get('/info/junta/:id_usuario', infojuntacontroller.obtenerInformacionJunta);


router.get('/juntas', infojuntacontroller.obtenerTodasLasJuntasController);

router.get('/junta/:id_junta', infojuntacontroller.obtenerinfojuntaid);


router.post('/junta/solicitar', infojuntacontroller.solicitarUnionJuntaController);

router.put('/junta/solicitar/:id_solicitud_union', infojuntacontroller.actualizarEstadoSolicitudUnionJuntaController);

router.get('/junta/publicaciones/:id_usuario', infojuntacontroller.traerpublicaciones);



module.exports = router;
