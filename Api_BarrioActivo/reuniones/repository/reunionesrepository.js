const db = require("../../common/config/db");
const oracle = require("oracledb");

async function crearReunion(
    u_tema,
    u_resumen,
    u_fecha_reunion,
    u_id_usuario,
    u_id_junta
) {
    let connection;
    try {
        console.log("Datos recibidos:", {
            u_tema,
            u_resumen,
            u_fecha_reunion,
            u_id_usuario,
            u_id_junta,
        });
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL 
                PL_CREACION_REUNION(:u_tema, :u_resumen, :u_fecha_reunion, :u_id_usuario, :u_id_junta, :u_mensaje, :u_error_code, 
                :id_reunion)`, // Añadir la coma que faltaba aquí
            {
                u_tema: { val: u_tema, dir: oracle.BIND_IN },
                u_resumen: { val: u_resumen, dir: oracle.BIND_IN },
                u_fecha_reunion: { val: u_fecha_reunion, dir: oracle.BIND_IN },
                u_id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                u_id_junta: { val: u_id_junta, dir: oracle.BIND_IN },
                u_mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                u_error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_reunion: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
            }
        );

        const u_mensaje = result.outBinds.u_mensaje;
        const u_error_code = result.outBinds.u_error_code;
        const p_id_reunion = result.outBinds.id_reunion; // Asegúrate de obtener el ID de la reunión

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        }

        console.log(
            "Inserción exitosa:",
            u_mensaje,
            "ID de reunión:",
            p_id_reunion
        );
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
        u.id_usuario AS "ID USUARIO",
        u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS "NOMBRE COMPLETO",
        r.r_tema AS "TEMA DE LA REUNION",
        r.fecha_reunion AS "FECHA DE LA REUNION",
        CASE 
            WHEN a.asistio = 1 THEN 'Sí'
            ELSE 'No'
        END AS "ASISTENCIA"
    FROM 
        ASISTENCIA a
    JOIN 
        USUARIO u ON a.id_usuario = u.id_usuario
    JOIN 
        REUNIONES r ON a.id_reunion = r.id_reunion
    WHERE 
        r.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
    ORDER BY 
        r.fecha_reunion DESC
    `;
    
    const result = await db.execute(query, { id_usuario });
    return result.rows;
};


module.exports = { crearReunion, registrarasistencia, reunion_asistecia };
