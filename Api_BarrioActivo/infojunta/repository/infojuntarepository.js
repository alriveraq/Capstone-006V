const db = require('../../common/config/db');
const oracle = require('oracledb');

const obtenerIdJuntaPorUsuario = async (id_usuario) => {
    const query = `
        SELECT id_junta
        FROM USUARIO
        WHERE id_usuario = :id_usuario
    `;
    const result = await db.execute(query, { id_usuario });
    return result.rows.length > 0 ? result.rows[0][0] : null;
}

const juntainformacion = async (id_junta) => {
    const query = `
        SELECT 
            j.nombre_barrio AS "NOMBRE DEL BARRIO",
            j.direccion AS "DIRECCION",
            j.id_junta AS "ID JUNTA",
            u_presidente.nombre || ' ' || u_presidente.a_paterno || ' ' || u_presidente.a_materno AS "PRESIDENTE",
            u_presidente.id_usuario AS "ID PRESIDENTE",
            u_presidente.email AS "CORREO PRESIDENTE",
            u_tesorero.nombre || ' ' || u_tesorero.a_paterno || ' ' || u_tesorero.a_materno AS "TESORERO",
            u_tesorero.email AS "CORREO TESORERO",
            u_secretario.nombre || ' ' || u_secretario.a_paterno || ' ' || u_secretario.a_materno AS "SECRETARIO",
            u_secretario.email AS "CORREO SECRETARIO"
        FROM 
            INFO_JUNTA ij
        JOIN 
            JUNTA_DE_VECINOS j ON ij.id_junta = j.id_junta
        LEFT JOIN 
            USUARIO u_presidente ON ij.id_presidente = u_presidente.id_usuario
        LEFT JOIN 
            USUARIO u_tesorero ON ij.id_tesorero = u_tesorero.id_usuario
        LEFT JOIN 
            USUARIO u_secretario ON ij.id_secretario = u_secretario.id_usuario
        WHERE 
            ij.id_junta = :id_junta`;

    const result = await db.execute(query, { id_junta });
    return result.rows ? result.rows : [];
}

const usuariosjunta = async (id_junta) => {
    const query = `SELECT 
        u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS "NOMBRE COMPLETO",
        u.email AS "EMAIL",
        u.tipo_casa AS "TIPO DE CASA",
        r.nombre AS "ROL",
        u.fecha_creacion AS "FECHA DE INSCRIPCIÓN"
    FROM 
        USUARIO u
    JOIN 
        ROL r ON u.id_rol = r.id_rol
    JOIN 
        JUNTA_DE_VECINOS j ON u.id_junta = j.id_junta
    WHERE 
        j.id_junta = :id_junta`;

    const result = await db.execute(query, { id_junta });
    return result.rows ? result.rows : [];
}

const solicitudesjunta = async (id_junta) => {
    const query = `
        SELECT
            u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS "NOMBRE COMPLETO",
            s.estado AS "ESTADO",
            s.ID_SOLICITUD_UNION as "ID SOLICITUD"
        FROM 
            SOLICITUDES_UNION_JUNTA s
        JOIN 
            USUARIO u ON s.id_usuario = u.id_usuario
        JOIN 
            JUNTA_DE_VECINOS j ON s.id_junta = j.id_junta
        WHERE 
            j.id_junta = :id_junta`;
    
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function solicitarUnionJunta(u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_solicitud) {
    let connection;

    try {
        // Convertimos la fecha a un formato compatible con Oracle antes de la consulta
        const formattedDate = new Date(u_fecha_solicitud).toISOString().slice(0, 19).replace('T', ' ');

        console.log('Solicitando unión a junta:', {
            u_id_usuario,
            u_id_presidente_junta,
            u_id_junta,
            u_estado,
            fecha_solicitud: formattedDate
        });

        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL PL_SOLICITUD_JUNTA(
                :id_usuario, 
                :id_presidente_junta, 
                :id_junta, 
                :estado, 
                TO_DATE(:fecha_solicitud, 'YYYY-MM-DD HH24:MI:SS'),
                :mensaje,
                :error_code)`,
            {
                id_usuario: { val: u_id_usuario, dir: oracle.BIND_IN },
                id_presidente_junta: { val: u_id_presidente_junta, dir: oracle.BIND_IN },
                id_junta: { val: u_id_junta, dir: oracle.BIND_IN },
                estado: { val: u_estado, dir: oracle.BIND_IN },
                fecha_solicitud: { val: formattedDate, dir: oracle.BIND_IN },
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



// Actualizar el estado de la solicitud de unión a junta
async function actualizarEstadoSolicitudUnionJunta(id_solicitud_union, estado) {
    let connection;

    try {
        console.log('Actualizando estado de la solicitud:', {
            id_solicitud_union,
            estado
        });
        connection = await db.getConnection();
        const result = await connection.execute(
            `CALL PL_ACTUALIZAR_ESTADO_SOLICITUD_UNION_JUNTA(
                :id_solicitud_union,
                :estado,
                :mensaje,
                :error_code)`,
                {
                    id_solicitud_union: { val: id_solicitud_union, dir: oracle.BIND_IN },
                    estado: { val: estado, dir: oracle.BIND_IN },
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

const obtenerTodasLasJuntas = async () => {
    const query = `SELECT 
        id_junta,
        nombre_barrio AS "NOMBRE DEL BARRIO",
        direccion AS "DIRECCION"
    FROM 
        JUNTA_DE_VECINOS`;
    
    const result = await db.execute(query);
    return result.rows;
};

//traemos las publicaciones de la junta sacando la id de la junta por el id del usuario
const obtenerPublicaciones = async (id_usuario) => {
    const query = `
        SELECT 
            p.id_publicaciones AS "ID PUBLICACION",
            p.p_titular AS "TITULO",
            p.contenido AS "DESCRIPCION",
            p.fecha_creacion AS "FECHA DE CREACION",
            p.IMAGEN AS "IMAGEN",
            u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS "AUTOR"
        FROM 
            PUBLICACIONES p
        JOIN 
            USUARIO u ON p.id_usuario = u.id_usuario
        WHERE 
            p.id_junta = (SELECT id_junta FROM USUARIO WHERE id_usuario = :id_usuario)
        ORDER BY 
            p.fecha_creacion DESC`;

    const result = await db.execute(query, { id_usuario });

    // Procesar las publicaciones
    const publicaciones = await Promise.all(result.rows.map(async (row) => {
        const [idPublicacion, titulo, contenidoLob, fechaCreacion, imagenBlob, autor] = row;

        // Leer el contenido del CLOB
        let contenido = contenidoLob;
        if (contenidoLob && typeof contenidoLob.getData === 'function') {
            contenido = await new Promise((resolve, reject) => {
                contenidoLob.getData((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        // Leer el BLOB de la imagen y convertirlo a base64
        let imagenBase64 = null;
        if (imagenBlob && typeof imagenBlob.getData === 'function') {
            imagenBase64 = await new Promise((resolve, reject) => {
                imagenBlob.getData((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Convertir el BLOB a base64
                        const base64String = Buffer.from(data).toString('base64');
                        resolve(`data:image/jpeg;base64,${base64String}`); // Ajusta el tipo MIME según sea necesario
                    }
                });
            });
        }

        return {
            idPublicacion,
            titulo,
            contenido, // Ahora es un string
            fechaCreacion,
            imagen: imagenBase64, // Imagen convertida a base64
            autor
        };
    }));

    return publicaciones;
};


module.exports = {
    obtenerIdJuntaPorUsuario,
    juntainformacion,
    usuariosjunta,
    solicitudesjunta,
    solicitarUnionJunta,
    obtenerTodasLasJuntas,
    actualizarEstadoSolicitudUnionJunta,
    obtenerPublicaciones
};
