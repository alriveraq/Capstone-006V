const express = require('express');
const router = express.Router();
const { obtenerInformacionUsuarioController } = require('../controller/usuariocontroller');


router.get('/usuario/:id_usuario', obtenerInformacionUsuarioController);

module.exports = router;