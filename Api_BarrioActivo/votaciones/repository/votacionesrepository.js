const db = require("../../common/config/db");
const oracle = require("oracledb");
const { enviarCorreoJunta } = require("../service/correoservice");



async function obtenerCorreosJunta(id_junta) {
    const query = `
          SELECT email
          FROM USUARIO
          WHERE id_junta = :id_junta`;

    const result = await db.execute(query, { id_junta });
    return result.rows.map((row) => row[0]);
}

async function crearvotaciones(
    u_v_tema,
    u_v_fecha_inicio,
    u_v_fecha_fin,
    u_v_id_junta,
    u_v_id_usuario,
    enviarCorreo
) {
    let connection;
    try {
        connection = await db.getConnection();
        const enviarCorreoValue = enviarCorreo ? 1 : 0;

        const result = await connection.execute(
            `CALL 
                PL_CREACION_VOTACION(:u_v_tema, :u_v_fecha_inicio, :u_v_fecha_fin, :u_v_id_junta, :u_v_id_usuario, :enviar_correo, :u_mensaje, :u_error_code, 
                :id_votacion)`,
            {
                u_v_tema: { val: u_v_tema, dir: oracle.BIND_IN },
                u_v_fecha_inicio: { val: u_v_fecha_inicio, dir: oracle.BIND_IN },
                u_v_fecha_fin: { val: u_v_fecha_fin, dir: oracle.BIND_IN },
                u_v_id_junta: { val: u_v_id_junta, dir: oracle.BIND_IN },
                u_v_id_usuario: { val: u_v_id_usuario, dir: oracle.BIND_IN },
                enviar_correo: { val: enviarCorreoValue, dir: oracle.BIND_IN, type: oracle.NUMBER },
                u_mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                u_error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
                id_votacion: { dir: oracle.BIND_OUT, type: oracle.NUMBER },
            }
        );

        const u_mensaje = result.outBinds.u_mensaje;
        const u_error_code = result.outBinds.u_error_code;
        const p_id_votacion = result.outBinds.id_votacion;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        } else {
            console.log("Creacion de votacion exitosa", p_id_votacion);

            if (enviarCorreo) {
                const correos = await obtenerCorreosJunta(u_v_id_junta);
                console.log("Correos obtenidos", correos);
                await enviarCorreoJunta(correos, u_v_tema, u_v_fecha_inicio, u_v_fecha_fin);
            }

            return { p_id_votacion: result.outBinds.id_votacion };
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

async function registrarvoto(u_id_votacion, u_id_usuario, u_voto_tipo) {
    let connection;
    try {
        connection = await db.getConnection();

        const result = await connection.execute(
            `CALL 
                PL_REGISTRO_VOTO(:u_id_votacion, :u_id_usuario, :u_voto_tipo, :u_mensaje, :u_error_code)`,
            {
                u_id_votacion: { val: u_id_votacion, dir: oracle.BIND_IN },
                u_id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                u_voto_tipo: { val: u_voto_tipo, dir: oracle.BIND_IN },
                u_mensaje: { dir: oracle.BIND_OUT, type: oracle.STRING },
                u_error_code: { dir: oracle.BIND_OUT, type: oracle.STRING },
            }
        );

        const u_mensaje = result.outBinds.u_mensaje;
        const u_error_code = result.outBinds.u_error_code;

        if (u_error_code) {
            return Promise.reject({
                code: u_error_code,
                message: u_mensaje,
            });
        }
    }catch (error) {
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

const obtenerVotaciones = async (id_usuario) => {
    const query = `
    SELECT 
        v.v_tema AS tema,
        v.v_fecha_inicio AS fecha_inicio,
        v.v_fecha_fin AS fecha_fin,
        COUNT(CASE WHEN i.voto_tipo = 'A favor' THEN 1 END) AS total_a_favor,
        COUNT(CASE WHEN i.voto_tipo = 'En contra' THEN 1 END) AS total_en_contra,
        COUNT(CASE WHEN i.voto_tipo = 'Abstencion' THEN 1 END) AS total_abstenciones,
        v.id_votaciones AS id_votacion
    FROM 
        VOTACIONES v
    LEFT JOIN 
        INFO_VOTACION i ON v.id_votaciones = i.id_votaciones
    WHERE 
        v.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
    GROUP BY 
        v.id_votaciones, v.v_tema, v.v_fecha_inicio, v.v_fecha_fin
    ORDER BY 
        v.v_fecha_inicio
`;
    try{
        const result = await db.execute(query, { id_usuario });
        return result.rows;
    } catch (error) {
        console.error("Error executing query from repository:", error);
        throw new Error("Internal Server Error from repository");
    }
}

module.exports = { crearvotaciones, registrarvoto,  obtenerVotaciones};
