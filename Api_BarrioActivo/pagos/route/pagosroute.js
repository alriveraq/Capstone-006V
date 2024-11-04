const express = require('express');
const router = express.Router();

const pagoscontroller = require('../controller/pagoscontroller');

router.post('/pagos/crearpagos', pagoscontroller.crearpagos);

router.post('/pagos/registrarpago', pagoscontroller.registrarpago);

router.get('/pagos/obtenerpagos/:id_usuario', pagoscontroller.obtenerpagos);

router.put('/pagos/actualuzarestadopago', pagoscontroller.actualuzarestadopago);


module.exports = router;