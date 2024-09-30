const db = require('../../common/config/db');

const obtenerIdJuntaPorUsuario = async (id_usuario) => {
    const query = `
        SELECT id_junta
        FROM USUARIO
        WHERE id_usuario = :id_usuario
    `;
    const result = await db.execute(query, { id_usuario });
    return result.rows.length > 0 ? result.rows[0][0] : null; // Retorna la id_junta o null
}

const juntainformacion = async (id_junta) => {
    const query = `
        SELECT 
            j.nombre_barrio AS "NOMBRE DEL BARRIO",
            j.direccion AS "DIRECCION",
            u_presidente.nombre || ' ' || u_presidente.a_paterno || ' ' || u_presidente.a_materno AS "PRESIDENTE",
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
    return result.rows;
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
    return result.rows;
}

const solicitudesjunta = async (id_junta) => {
    const query = `
        SELECT
            u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS "NOMBRE COMPLETO",
            s.estado AS "ESTADO"
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

module.exports = {
    obtenerIdJuntaPorUsuario,
    juntainformacion,
    usuariosjunta,
    solicitudesjunta
};
