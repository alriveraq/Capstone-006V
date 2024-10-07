const db = require('../../common/config/db');

const informacionUsuario = async (id_usuario) => {
    const query = `
        SELECT 
            nombre AS "NOMBRE",
            a_paterno AS "APELLIDO PATERNO",
            a_materno AS "APELLIDO MATERNO",
            email AS "EMAIL",
            tipo_casa AS "TIPO DE CASA",
            rut AS "RUT",
            adultos_mayores AS "ADULTOS MAYORES",
            integrantes AS "INTEGRANTES",
            fecha_creacion AS "FECHA DE INSCRIPCIÓN"
        FROM 
            USUARIO
        WHERE 
            id_usuario = :id_usuario`;

    const result = await db.execute(query, { id_usuario });
    return result.rows;
}

module.exports = { informacionUsuario };