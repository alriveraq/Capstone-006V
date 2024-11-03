const pagosrepository = require('../repository/pagosrepository');

async function crearpagos(concepto_pago, monto, id_junta) {
    try {
        return await pagosrepository.crearpagos(concepto_pago, monto, id_junta);
    } catch (error) {
        throw error;
    }
}

async function registrarpago(id_pagos, id_usuario, monto, u_imagen_transferencia) {
    try {
        return await pagosrepository.registrarpago(id_pagos, id_usuario, monto, u_imagen_transferencia);
    } catch (error) {
        throw error;
    }
}

async function obtenerpagos(id_usuario) {
    try {
        return await pagosrepository.obtenerpagos(id_usuario);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearpagos, registrarpago, obtenerpagos
};