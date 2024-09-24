const db = require('../../common/config/db');
const oracle = require('oracledb');

async function crearjunta(u_nombre_barrio, u_direccion, u_fecha_fundacion, id_presidente) {
    let connection;

    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `CALL PL_CREACION_JUNTA(
            :nombre_barrio, :direccion, :fecha_fundacion, :mensaje, :error_code, :id_junta)`,
            {
                nombre_barrio: { val: u_nombre_barrio, dir: oracle.BIND_IN },
                direccion: { val: u_direccion, dir: oracle.BIND_IN },
                fecha_fundacion: { val: u_fecha_fundacion, dir: oracle.BIND_IN },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_junta: { dir: oracle.BIND_OUT, type: oracle.NUMBER } // Parámetro para obtener ID_JUNTA
            }
        );

        const u_mensaje = result.outBinds.mensaje;
        const u_error_code = result.outBinds.error_code;
        const id_junta = result.outBinds.id_junta; // Asegúrate de capturar el ID_JUNTA aquí

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje
            });
        }

        if (!id_junta) {
            throw new Error('No se pudo obtener el ID_JUNTA.');
        }

        // Ahora puedes insertar en la tabla INFO_JUNTA
        await connection.execute(
            `INSERT INTO INFO_JUNTA (ID_INFO_JUNTA, ID_JUNTA, ID_PRESIDENTE, ID_TESORERO, ID_SECRETARIO)
            VALUES (id_sequence.NEXTVAL, :id_junta, :id_presidente, NULL, NULL)`,
            {
                id_junta: { val: id_junta, dir: oracle.BIND_IN },
                id_presidente: { val: id_presidente, dir: oracle.BIND_IN }
            }
        );

        await connection.commit(); // Asegúrate de confirmar los cambios
    } catch (error) {
        console.error('Error executing stored procedure from repository:', error);
        throw new Error('Internal Server Error from repository');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing the connection:', err);
            }
        }
    }
}

module.exports = { crearjunta };
