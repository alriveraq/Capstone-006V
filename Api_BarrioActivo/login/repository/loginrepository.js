const db = require('../../common/config/db');
const oracle = require('oracledb');

async function login(u_email, u_contrasena) {
    let connection;

    try {
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL PL_LOGIN(:email, :contrasena, :mensaje, :id_result, :error_code)`,
            {
                email: { val: u_email, dir: oracle.BIND_IN },
                contrasena: { val: u_contrasena, dir: oracle.BIND_IN },
                mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_result: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
                error_code: { dir: oracle.BIND_OUT, type: oracle.STRING }
            }
        );
        const u_mensaje = result.outBinds.mensaje;
        const u_id_result = result.outBinds.id_result;
        const u_error_code = result.outBinds.error_code;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje
            });
        }

        return u_id_result;
    } catch (error) {
        console.error('Error executing stored procedure from repository:', error);
        throw new Error('Internal Server Error from repository');
    } finally {
        if (connection) {
            try {
                // Liberar la conexión
                await connection.close();
            } catch (err) {
                console.error('Error closing the connection:', err);
            }
        }
    }
}

module.exports = {
    login
};
