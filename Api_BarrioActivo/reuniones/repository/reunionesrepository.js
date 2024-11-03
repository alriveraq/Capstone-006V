const db = require("../../common/config/db");
const oracle = require("oracledb");
const {  enviarCorreoJunta } = require('../service/correoservice'); // Cambia la ruta según tu estructura de proyecto



async function obtenerCorreosJunta(id_junta) {
    const query = `
          SELECT email
          FROM USUARIO
          WHERE id_junta = :id_junta`;
  
    const result = await db.execute(query, { id_junta });
    return result.rows.map((row) => row[0]); 
  }

async function crearReunion(
    u_tema,
    u_resumen,
    u_fecha_reunion,
    u_id_usuario,
    u_id_junta,
    enviarCorreo
) {
    let connection;
    try {
        connection = await db.getConnection();

        console.log("Datos recibidos antes de enviarCorreoValue:", { u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta, enviarCorreo });

        const enviarCorreoValue = enviarCorreo ? 1 : 0;

        console.log("Datos recibidos post enviar correo:", { u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta, enviarCorreo });

        const result = await connection.execute(
            `CALL 
                PL_CREACION_REUNION(:u_tema, :u_resumen, :u_fecha_reunion, :u_id_usuario, :u_id_junta, :enviar_correo, :u_mensaje, :u_error_code, 
                :id_reunion)`,
            {
                u_tema: { val: u_tema, dir: oracle.BIND_IN },
                u_resumen: { val: u_resumen, dir: oracle.BIND_IN },
                u_fecha_reunion: { val: u_fecha_reunion, dir: oracle.BIND_IN },
                u_id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                u_id_junta: { val: u_id_junta, dir: oracle.BIND_IN },
                enviar_correo: { val: enviarCorreoValue, dir: oracle.BIND_IN, type: oracle.NUMBER }, 
                u_mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                u_error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_reunion: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
            }
        );

        const u_mensaje = result.outBinds.u_mensaje;
        const u_error_code = result.outBinds.u_error_code;
        const p_id_reunion = result.outBinds.id_reunion;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        }else{

        console.log(
            "Inserción exitosa:",
            u_mensaje,
            "ID de reunión:",
            p_id_reunion
        );

        if (enviarCorreo) {
            const correos = await obtenerCorreosJunta(u_id_junta);
            console.log("Correos obtenidos:", correos);
            await enviarCorreoJunta(correos, u_tema, u_fecha_reunion);
        }

        return {p_id_reunion: result.outBinds.id_reunion};
    }
    } catch (error) {
        console.error("Error executing stored procedure from repository:", error);
        throw new Error("Internal Server Error from repository");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing the connection:", err);
            }
        }
    }
}

async function registrarasistencia(u_id_usuario, u_id_reunion, u_asistio) {
    let connection;
    try {
        console.log("Datos recibidos:", { u_id_usuario, u_id_reunion, u_asistio });
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL 
                PL_REGISTRO_ASISTENCIA(:u_id_reunion, :u_id_usuario, :u_asistio, :u_mensaje, :u_error_code)`,
            {
                u_id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                u_id_reunion: { val: u_id_reunion, dir: oracle.BIND_IN },
                u_asistio: { val: u_asistio, dir: oracle.BIND_IN },
                u_mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                u_error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
            }
        );

        const u_mensaje = result.outBinds.mensaje;
        const u_error_code = result.outBinds.error_code;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        }
    } catch (error) {
        console.error("Error executing stored procedure from repository:", error);
        throw new Error("Internal Server Error from repository");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing the connection:", err);
            }
        }
    }
}

const reunion_asistecia = async (id_usuario) => {
    const query = `
        SELECT 
            r.r_tema AS tema,
            r.fecha_reunion AS fecha,
            COUNT(CASE WHEN a.asistio = 1 THEN 1 END) AS total_asistentes,
            COUNT(CASE WHEN a.asistio = 0 THEN 1 END) AS total_no_asistentes,
            r.id_reunion AS id_reunion
        FROM 
            REUNIONES r
        LEFT JOIN 
            ASISTENCIA a ON r.id_reunion = a.id_reunion
        WHERE 
            r.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
        GROUP BY 
            r.id_reunion, r.r_tema, r.fecha_reunion
        ORDER BY 
            r.fecha_reunion
    `;

    try {
        const result = await db.execute(query, { id_usuario });
        return result.rows;
    } catch (error) {
        console.error('Error al obtener la asistencia a la reunión:', error);
        throw error; // Maneja el error según sea necesario
    }
};




module.exports = { crearReunion, registrarasistencia, reunion_asistecia };
