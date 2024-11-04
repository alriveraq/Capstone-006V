// SolicitudRoute.js

const express = require('express');
const router = express.Router();
const SolicitudController = require('../controller/solicitudcontroller');


router.post('/solicitudes', SolicitudController.crearSolicitud);

router.get('/solicitudes/:id_usuario', SolicitudController.obtenersolicitudes);

router.put('/solicitudes', SolicitudController.actualizarestadosolicitud);

module.exports = router;
