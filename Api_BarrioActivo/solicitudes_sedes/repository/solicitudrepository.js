const db = require('../../common/config/db');
const oracle = require('oracledb');

async function crearSolicitud({
    id_usuario,
    id_junta,
    tipo_solicitud,
    fecha_inicio,
    fecha_fin,
    descripcion
}) {
    let connection;
    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `CALL PL_CREAR_SOLICITUD_SEDE(
                :id_usuario,
                :id_junta,
                :tipo_solicitud,
                :fecha_inicio,
                :fecha_fin,
                :descripcion,
                :estado,
                :mensaje
            )`,
            {
                id_usuario: { val: id_usuario, dir: oracle.BIND_IN },
                id_junta: { val: id_junta, dir: oracle.BIND_IN },
                tipo_solicitud: { val: tipo_solicitud, dir: oracle.BIND_IN },
                fecha_inicio: { val: fecha_inicio, dir: oracle.BIND_IN },
                fecha_fin: { val: fecha_fin, dir: oracle.BIND_IN },
                descripcion: { val: descripcion, dir: oracle.BIND_IN },
                estado: { dir: oracle.BIND_OUT, type: oracle.STRING },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING }
            }
        );

        const estado = result.outBinds.estado;
        const mensaje = result.outBinds.mensaje;

        if (estado === 'ERROR') {
            throw new Error(mensaje);
        }

        return { mensaje };
    } catch (error) {
        console.error('Error en crearSolicitud:', error);
        throw new Error('Error al crear la solicitud');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error cerrando la conexión:', err);
            }
        }
    }
}

async function obtenersolicitudes(id_usuario){
    const query = `
    SELECT 
    s.id_solicitud AS "ID SOLICITUD",
    s.tipo_solicitud AS "TIPO DE SOLICITUD",
    s.fecha_solicitud AS "FECHA DE SOLICITUD",
    s.fecha_inicio AS "FECHA DE INICIO",
    s.fecha_fin AS "FECHA DE FIN",
    s.estado AS "ESTADO",
    s.descripcion AS "DESCRIPCION"
FROM 
    SOLICITUDES_SEDES s
WHERE 
    s.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
ORDER BY 
    s.fecha_solicitud DESC
    `;
    let connection;
    try{
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

async function actualizarestadosolicitud(u_id_solicitud, u_estado){
    let connection;

    try{
        console.log('Datos recibidos:', { u_id_solicitud, u_estado });
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL PL_ACTUALIZAR_SOLICITUD_DE_SEDE(
                :u_id_solicitud,
                :u_estado,
                :mensaje,
                :error_code)`,
            {
                u_id_solicitud: { val: u_id_solicitud, dir: oracle.BIND_IN },
                u_estado: { val: u_estado, dir: oracle.BIND_IN },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                error_code: { dir: oracle.BIND_OUT, type: oracle.STRING }

            }
        );

        const u_mensaje = result.outBinds.mensaje;
        const u_error_code = result.outBinds.error_code;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje
            });
        } else {
            return {
                message: u_mensaje
            };
        }
    } catch (error) {
        console.error('Error en actualizarestadosolicitud:', error);
        throw new Error('Error al actualizar el estado de la solicitud');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error cerrando la conexión:', err);
            }
        }
    }
}

module.exports = { crearSolicitud, obtenersolicitudes, actualizarestadosolicitud  };
