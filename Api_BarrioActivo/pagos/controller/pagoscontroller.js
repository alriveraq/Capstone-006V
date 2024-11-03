const pagosservice = require('../service/pagosservice');

async function crearpagos(req, res) {
    const { u_concepto_pago, u_monto, u_id_junta } = req.body;

    console.log('Datos recibidos:', { u_concepto_pago, u_monto, u_id_junta });

    try {
        await pagosservice.crearpagos(u_concepto_pago, u_monto, u_id_junta);

        res.status(200).json({ message: 'Pago creado correctamente' });
    } catch (error) {
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

async function registrarpago(req, res) {
    const { u_id_pagos, u_id_usuario, u_monto, u_imagen_transferencia } = req.body;

    console.log('Datos recibidos:', { u_id_pagos, u_id_usuario, u_monto, u_imagen_transferencia });

    try {
        const result = await pagosservice.registrarpago(u_id_pagos, u_id_usuario, u_monto, u_imagen_transferencia);
        res.status(200).json(result); // Asegúrate de retornar el resultado del servicio
    } catch (error) {
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

async function obtenerpagos(req, res) {
    const { id_usuario } = req.params;

    console.log('Datos recibidos:', { id_usuario });

    try {
        const result = await pagosservice.obtenerpagos(id_usuario);
        res.status(200).json(result); 
    } catch (error) {
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}


module.exports = { crearpagos, registrarpago, obtenerpagos };