const db = require("../../common/config/db");
const oracle = require("oracledb");


async function crearpagos(
    u_concepto_pago,
    u_monto,
    u_id_junta
) {
    let connection;
    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `CALL PL_CREACION_PAGO(
                :concepto_pago, :monto, :id_junta, :mensaje, :error_code, :id_pago)`,
            {
                concepto_pago: { val: u_concepto_pago, dir: oracle.BIND_IN },
                monto: { val: u_monto, dir: oracle.BIND_IN },
                id_junta: { val: u_id_junta, dir: oracle.BIND_IN },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_pago: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
            }
        );

        const u_mensaje = result.outBinds.mensaje;
        const u_error_code = result.outBinds.error_code;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        } else {
            return {
                message: u_mensaje,
            };
        }
    } catch (error) {
        return Promise.reject({
            code: "ERROR",
            message: error.message,
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error.message);
            }
        }
    }
    
}

async function registrarpago(
    u_id_pagos,
    u_id_usuario,
    u_monto,
    u_imagen_transferencia
) {
    let connection;
    try {
        connection = await db.getConnection();

        // Conversión de imagen
        let imagenBuffer;
        if (typeof u_imagen_transferencia === 'string' && u_imagen_transferencia.startsWith('data:image/')) {
            const base64Data = u_imagen_transferencia.split(',')[1];
            imagenBuffer = Buffer.from(base64Data, 'base64');
        } else if (Buffer.isBuffer(u_imagen_transferencia)) {
            imagenBuffer = u_imagen_transferencia;
        } else {
            throw new Error('El formato de la imagen no es válido. Debe ser un Buffer o una cadena Base64.');
        }

        console.log('Datos recibidos:', { u_id_pagos, u_id_usuario, u_monto, imagenBuffer });
        const result = await connection.execute(
            `CALL PL_CREACION_REGISTRO_PAGO(
                :id_pagos, 
                :id_usuario, 
                :monto, 
                :imagen_transferencia, 
                :error_code, 
                :mensaje, 
                :id_registro_pago)`,
            {
                id_pagos: { val: u_id_pagos, dir: oracle.BIND_IN },
                id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                monto: { val: u_monto, dir: oracle.BIND_IN },
                imagen_transferencia: { val: imagenBuffer, dir: oracle.BIND_IN, type: oracle.BLOB }, // Asegúrate de que el tipo sea BLOB
                error_code: { dir: oracle.BIND_OUT, type: oracle.STRING, maxSize: 20 },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING, maxSize: 200 },
                id_registro_pago: { dir: oracle.BIND_OUT, type: oracle.NUMBER } // Asegúrate de incluir el parámetro de salida
            }
        );
        

        const u_mensaje = result.outBinds.mensaje;
        const u_error_code = result.outBinds.error_code;

        // Verificar el código de error
        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        } else {
            return {
                message: u_mensaje,
            };
        }
    } catch (error) {
        return Promise.reject({
            code: "ERROR",
            message: error.message,
        });
    } finally {
        // Cerrar la conexión si existe
        if (connection) {
            try {
                await connection.close();
            } catch (closeError) {
                console.error(closeError.message);
            }
        }
    }
}

async function obtenerpagos(id_usuario) {
    const query = `
    SELECT 
    p.id_pagos AS "ID PAGO",
    p.concepto_pago AS "CONCEPTO",
    p.monto AS "MONTO",
    p.fecha_creacion AS "FECHA DE CREACION"
FROM 
    PAGOS p
WHERE 
    p.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
    `;
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.execute(query, [id_usuario]);
        return result.rows;
    } catch (error) {
        return Promise.reject({
            code: "ERROR",
            message: error.message,
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error.message);
            }
        }
    }
}
    
    



module.exports = {
    crearpagos, registrarpago, obtenerpagos
};