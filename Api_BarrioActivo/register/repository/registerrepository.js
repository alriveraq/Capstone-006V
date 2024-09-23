const db = require('../../common/config/db');
const oracle = require('oracledb');


async function register(u_rut, u_nombre, u_a_paterno, u_a_materno, u_tipo_casa,
    u_adultos_mayores, u_integrantes, u_email, u_contrasena, u_id_rol, u_id_junta) {
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL PL_REGISTRO_USUARIO(
            :rut, :nombre, :a_paterno, :a_materno, :tipo_casa,
            :adultos_mayores, :integrantes, :email, :contrasena,
            :id_rol, :id_junta, :mensaje, :error_code)`,
            {
                rut: { val: u_rut, dir: oracle.BIND_IN },
                nombre: { val: u_nombre, dir: oracle.BIND_IN },
                a_paterno: { val: u_a_paterno, dir: oracle.BIND_IN },
                a_materno: { val: u_a_materno, dir: oracle.BIND_IN },
                tipo_casa: { val: u_tipo_casa, dir: oracle.BIND_IN },
                adultos_mayores: { val: u_adultos_mayores, dir: oracle.BIND_IN },
                integrantes: { val: u_integrantes, dir: oracle.BIND_IN },
                email: { val: u_email, dir: oracle.BIND_IN },
                contrasena: { val: u_contrasena, dir: oracle.BIND_IN },
                id_rol: { val: u_id_rol || null, dir: oracle.BIND_IN },
                id_junta: { val: u_id_junta || null, dir: oracle.BIND_IN },
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
        }
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

module.exports = { register };
