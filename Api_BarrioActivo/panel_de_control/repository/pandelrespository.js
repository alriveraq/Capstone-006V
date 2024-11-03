const db = require("../../common/config/db");
const oracle = require("oracledb");

//Panel de control por junta
async function obtenereltotaljuntas() {
    const query = `
          SELECT 
    COUNT(id_junta) AS total_juntas
FROM 
    JUNTA_DE_VECINOS`;
    const result = await db.execute(query);
    return result.rows;
}

async function verinformaciondejunta() {
    const query = `
            SELECT 
    j.id_junta,                               
    j.nombre_barrio,                         
    j.direccion,                             
    j.fecha_fundacion,                       
    i.id_presidente,                          
    i.id_tesorero,                            
    i.id_secretario,                          
    u1.nombre || ' ' || u1.a_paterno AS nombre_presidente,           
    u2.nombre || ' ' || u2.a_paterno AS nombre_tesorero,             
    u3.nombre || ' ' || u3.a_paterno AS nombre_secretario,           
    COUNT(u.id_usuario) AS total_usuarios     
FROM 
    JUNTA_DE_VECINOS j
JOIN 
    INFO_JUNTA i ON j.id_junta = i.id_junta 
LEFT JOIN 
    USUARIO u ON u.id_junta = j.id_junta      
LEFT JOIN 
    USUARIO u1 ON i.id_presidente = u1.id_usuario  
LEFT JOIN 
    USUARIO u2 ON i.id_tesorero = u2.id_usuario    
LEFT JOIN 
    USUARIO u3 ON i.id_secretario = u3.id_usuario            
GROUP BY 
    j.id_junta,                                   
    j.nombre_barrio,                              
    j.direccion,                                
    j.fecha_fundacion,                         
    i.id_presidente,                              
    i.id_tesorero,                                
    i.id_secretario,                               
    u1.nombre,                                     
    u1.a_paterno,                                
    u2.nombre,                                     
    u2.a_paterno,                                  
    u3.nombre,                                    
    u3.a_paterno`;
    const result = await db.execute(query);
    return result.rows;
}

async function totaldeusuariosporjunta(id_junta) {
    const query = `
            SELECT 
    COUNT(u.id_usuario) AS total_usuarios
FROM
    USUARIO u
JOIN
    JUNTA_DE_VECINOS j ON u.id_junta = j.id_junta
WHERE
    j.id_junta = :id_junta`;
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function proximareunion(id_junta) {
    const query = `
        SELECT 
            r.id_reunion,
            r.r_tema,
            TO_CHAR(r.resumen) AS resumen,
            r.fecha_reunion,
            j.id_junta,
            j.nombre_barrio
        FROM 
            REUNIONES r
        JOIN 
            JUNTA_DE_VECINOS j ON r.id_junta = j.id_junta
        WHERE 
            r.fecha_reunion > SYSDATE AND 
            j.id_junta = :id_junta
        ORDER BY 
            r.fecha_reunion ASC
        FETCH FIRST 1 ROW ONLY`;
    
    const result = await db.execute(query, { id_junta });
    return result.rows; 
}

async function votacionesactivasporjunta(id_junta) {
    const query = `
    SELECT 
    j.id_junta,
    j.nombre_barrio,
    COUNT(v.id_votaciones) AS total_votaciones_activas
FROM 
    JUNTA_DE_VECINOS j
LEFT JOIN 
    VOTACIONES v ON j.id_junta = v.id_junta
WHERE 
    j.id_junta = :id_junta AND 
    v.v_fecha_inicio <= SYSDATE AND 
    v.v_fecha_fin >= SYSDATE
GROUP BY 
    j.id_junta, j.nombre_barrio
ORDER BY 
    j.id_junta`;

    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function proyectosactivosporjunta(id_junta) {
    const query = `
    SELECT 
    j.id_junta,
    j.nombre_barrio,
    COUNT(p.id_proyecto) AS total_proyectos_activos
FROM
    JUNTA_DE_VECINOS j
LEFT JOIN
    PROYECTOS p ON j.id_junta = p.id_junta
WHERE
    j.id_junta = :id_junta AND
    p.fecha_inicio <= SYSDATE AND
    p.fecha_fin >= SYSDATE
GROUP BY
    j.id_junta, j.nombre_barrio
ORDER BY
    j.id_junta`;
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function todoslosusuariosporjunta(id_junta) {
    const query = `
    SELECT 
    j.id_junta,
    j.nombre_barrio,
    u.id_usuario,
    u.nombre,
    u.a_paterno,
    u.a_materno,
    u.email
FROM 
    JUNTA_DE_VECINOS j
JOIN 
    USUARIO u ON j.id_junta = u.id_junta
WHERE 
    j.id_junta = :id_junta
ORDER BY 
    u.id_usuario`;
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function votacionesactivas(id_junta) {
    const query = `
    SELECT 
    v.id_votaciones,
    v.v_tema,
    v.v_fecha_inicio,
    v.v_fecha_fin,
    j.id_junta,
    j.nombre_barrio
FROM 
    VOTACIONES v
JOIN 
    JUNTA_DE_VECINOS j ON v.id_junta = j.id_junta
WHERE 
    j.id_junta = :id_junta AND
    v.v_fecha_inicio <= SYSDATE AND 
    v.v_fecha_fin >= SYSDATE
ORDER BY 
    v.v_fecha_inicio`;
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

async function proyectosactivos(id_junta) {
    const query = `
    SELECT 
    p.id_proyecto,
    p.nombre_proyecto,
    p.fecha_inicio,
    p.fecha_fin,
    j.id_junta,
    j.nombre_barrio
FROM
    PROYECTOS p
JOIN
    JUNTA_DE_VECINOS j ON p.id_junta = j.id_junta
WHERE
    j.id_junta = :id_junta AND
    p.fecha_inicio <= SYSDATE AND
    p.fecha_fin >= SYSDATE
ORDER BY
    p.fecha_inicio`;
    const result = await db.execute(query, { id_junta });
    return result.rows;
}

//Panel de control por usuario

async function totaldeusuarios() {
    const query = `
    SELECT 
    COUNT(id_usuario) AS total_usuarios
FROM
    USUARIO`;
    const result = await db.execute(query);
    return result.rows;
}

async function vertodoslosusuarios() {
    const query = `
    SELECT 
    u.id_usuario,
    u.nombre,
    u.a_paterno,
    u.a_materno,
    u.rut,
    j.nombre_barrio
FROM 
    USUARIO u
LEFT JOIN 
    JUNTA_DE_VECINOS j ON u.id_junta = j.id_junta`;
    const result = await db.execute(query);
    return result.rows;
}

async function verinfodeusuario(id_usuario) {
    const query = `
    SELECT 
    u.rut,
    u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS nombre_completo,
    u.tipo_casa,
    u.integrantes,
    u.adultos_mayores,
    u.email,
    r.nombre AS nombre_rol,
    j.nombre_barrio AS nombre_junta
FROM 
    USUARIO u
LEFT JOIN 
    ROL r ON u.id_rol = r.id_rol
LEFT JOIN 
    JUNTA_DE_VECINOS j ON u.id_junta = j.id_junta
WHERE 
    u.id_usuario = :id_usuario`;
    const result = await db.execute(query, { id_usuario });
    return result.rows;
}

//Panel de control por reuniones

async function totaldereunionesen30dias() {
    const query = `
    SELECT 
    COUNT(*) AS total_reuniones
FROM 
    REUNIONES
WHERE 
    fecha_reunion BETWEEN SYSDATE AND SYSDATE + INTERVAL '30' DAY`;
    const result = await db.execute(query);
    return result.rows;
}

async function detallesproximareunion() {
    const query = `
    SELECT 
    r.id_reunion,
    r.r_tema,
    TO_CHAR (r.resumen) AS resumen,
    j.nombre_barrio AS nombre_junta,
    r.fecha_reunion
FROM 
    REUNIONES r
JOIN 
    JUNTA_DE_VECINOS j ON r.id_junta = j.id_junta
WHERE 
    r.fecha_reunion BETWEEN SYSDATE AND SYSDATE + INTERVAL '30' DAY`;
    const result = await db.execute(query);
    return result.rows;
}

async function inforeunion(id_reunion) {
    const query = `
    SELECT 
        r.r_tema,
        TO_CHAR(r.resumen) AS Resumen,  -- Corrige TO_CHAT a TO_CHAR
        j.nombre_barrio AS nombre_junta,
        r.fecha_reunion
    FROM
        REUNIONES r
    JOIN
        JUNTA_DE_VECINOS j ON r.id_junta = j.id_junta
    WHERE
        r.id_reunion = :id_reunion`;
    
    const result = await db.execute(query, { id_reunion });
    return result.rows;  // Asegúrate de que esto devuelve un array de resultados
}


async function infoasistentesunion(id_reunion) {
    const query = `
    SELECT 
    u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS nombre_completo,
    j.nombre_barrio AS nombre_junta,
    a.fecha_asistencia,
    CASE 
        WHEN a.asistio = 1 THEN 'Sí'
        ELSE 'No'
    END AS asistio
FROM 
    ASISTENCIA a
JOIN 
    REUNIONES r ON a.id_reunion = r.id_reunion
JOIN 
    USUARIO u ON a.id_usuario = u.id_usuario
JOIN 
    JUNTA_DE_VECINOS j ON r.id_junta = j.id_junta
WHERE 
    r.id_reunion = :id_reunion
`;
    const result = await db.execute(query, { id_reunion });
    return result.rows;
}

async function totaldeasistentes(id_reunion) {
    const query = `
    SELECT 
    COUNT(CASE WHEN a.asistio = 1 THEN 1 END) AS "total_asistentes",
    COUNT(CASE WHEN a.asistio = 0 THEN 1 END) AS "total_no_asistentes",
    COUNT(*) AS "total_participantes"
FROM 
    ASISTENCIA a
JOIN 
    REUNIONES r ON a.id_reunion = r.id_reunion
WHERE 
    r.id_reunion = :id_reunion`;
    const result = await db.execute(query, { id_reunion });
    return result.rows;
}

//panel de control votaciones

async function totaldevotaciones() {
    const query = `
    SELECT 
    COUNT(*) AS total_votaciones_activas
FROM 
    VOTACIONES
WHERE 
    v_fecha_inicio <= SYSDATE AND 
    v_fecha_fin >= SYSDATE`;
    const result = await db.execute(query);
    return result.rows;
}

async function totalvotacionesactivas() {
    const query = `
    SELECT 
    v.id_votaciones,
    v.v_tema,
    v.v_fecha_inicio,
    v.v_fecha_fin,
    j.nombre_barrio AS nombre_junta
FROM
    VOTACIONES v
JOIN
    JUNTA_DE_VECINOS j ON v.id_junta = j.id_junta
WHERE
    v.v_fecha_inicio <= SYSDATE AND
    v.v_fecha_fin >= SYSDATE
ORDER BY
    v.v_fecha_inicio`;
    const result = await db.execute(query);
    return result.rows;
}

async function infovotacion(id_votaciones) {
    const query = `
    SELECT 
    v.v_tema,
    v.v_fecha_inicio,
    v.v_fecha_fin,
    j.nombre_barrio AS nombre_junta
FROM
    VOTACIONES v
JOIN
    JUNTA_DE_VECINOS j ON v.id_junta = j.id_junta
WHERE
    v.id_votaciones = :id_votaciones`;
    const result = await db.execute(query, { id_votaciones });
    return result.rows;
}

async function infoasistentesvotacion(id_votaciones) {
    const query = `
    SELECT 
    u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS nombre_completo,
    j.nombre_barrio AS nombre_junta,
    CASE 
        WHEN iv.voto_tipo IS NOT NULL THEN 'Voto Realizado'
        ELSE 'No Votó'
    END AS estado_voto
FROM 
    INFO_VOTACION iv
JOIN 
    USUARIO u ON iv.id_usuario = u.id_usuario
JOIN 
    VOTACIONES v ON iv.id_votaciones = v.id_votaciones
JOIN 
    JUNTA_DE_VECINOS j ON v.id_junta = j.id_junta
WHERE 
    iv.id_votaciones = :id_votaciones
`
    const result = await db.execute(query, {id_votaciones});
    return result.rows;
}

async function totaldeasistentesvotaciones(id_votaciones) {
    const query =`
    SELECT 
    COUNT(CASE WHEN iv.voto_tipo = 'A favor' THEN 1 END) AS total_a_favor,
    COUNT(CASE WHEN iv.voto_tipo = 'En contra' THEN 1 END) AS total_en_contra,
    COUNT(CASE WHEN iv.voto_tipo = 'Abstencion' THEN 1 END) AS total_abstenciones,
    COUNT(*) AS total_votantes
FROM 
    INFO_VOTACION iv
JOIN 
    VOTACIONES v ON iv.id_votaciones = v.id_votaciones
WHERE 
    v.id_votaciones = :id_votaciones `
    
    const result = await db.execute(query, {id_votaciones})
    return result.rows;
}


//pandel de control de proyectos

async function totaldeproyectos() {
    const query = `
    SELECT 
    COUNT(*) AS total_proyectos_activos
FROM
    PROYECTOS
WHERE
    fecha_inicio <= SYSDATE AND
    fecha_fin >= SYSDATE`;
    const result = await db.execute(query);
    return result.rows;
}

async function proyectosactivossinjunta() {
    const query = `
    SELECT 
    p.id_proyecto,
    p.nombre_proyecto,
    p.fecha_inicio,
    p.fecha_fin,
    j.nombre_barrio AS nombre_junta
FROM
    PROYECTOS p
JOIN
    JUNTA_DE_VECINOS j ON p.id_junta = j.id_junta
WHERE
    p.fecha_inicio <= SYSDATE AND
    p.fecha_fin >= SYSDATE
ORDER BY
    p.fecha_inicio`;
    const result = await db.execute(query);
    return result.rows;
}

async function infoproyecto(id_proyecto) {
    const query = `
    SELECT 
    p.nombre_proyecto,
    p.fecha_inicio,
    p.fecha_fin,
    j.nombre_barrio AS nombre_junta
FROM
    PROYECTOS p
JOIN
    JUNTA_DE_VECINOS j ON p.id_junta = j.id_junta
WHERE
    p.id_proyecto = :id_proyecto`;
    const result = await db.execute(query, { id_proyecto });
    return result.rows;
}

async function infoasistentesproyecto(id_proyecto) {
    const query = `
    SELECT 
    u.nombre || ' ' || u.a_paterno || ' ' || u.a_materno AS nombre_completo,
    j.nombre_barrio AS nombre_junta,
    po.estado AS "ESTADO DE LA SOLICITUD"
FROM 
    POSTULACIONES po
JOIN 
    USUARIO u ON po.id_usuario = u.id_usuario
JOIN 
    PROYECTOS p ON po.id_proyecto = p.id_proyecto
JOIN 
    JUNTA_DE_VECINOS j ON p.id_junta = j.id_junta
WHERE 
    po.id_proyecto = :id_proyecto`;
    const result = await db.execute(query, { id_proyecto });
    return result.rows;
}

async function totaldeasistentesproyecto(id_proyecto) {
    const query = `
    SELECT 
    COUNT(CASE WHEN po.estado = 'Aceptado' THEN 1 END) AS "total_aceptados",
    COUNT(CASE WHEN po.estado = 'Rechazado' THEN 1 END) AS "total_rechazados",
    COUNT(CASE WHEN po.estado = 'Pendiente' THEN 1 END) AS "S",
    COUNT(*) AS total_postulantes
FROM
    POSTULACIONES po
WHERE
    po.id_proyecto = :id_proyecto`;
    const result = await db.execute(query, { id_proyecto });
    return result.rows;
}






module.exports = {
    obtenereltotaljuntas,
    votacionesactivas,
    proyectosactivos,
    verinformaciondejunta,  
    totaldeusuariosporjunta,
    proximareunion,
    votacionesactivasporjunta,
    proyectosactivosporjunta,
    todoslosusuariosporjunta,
    totaldeusuarios,
    vertodoslosusuarios,
    verinfodeusuario,
    totaldereunionesen30dias,
    detallesproximareunion,
    inforeunion,
    infoasistentesunion,
    totaldeasistentes,
    totaldevotaciones,
    totalvotacionesactivas,
    infovotacion,
    infoasistentesvotacion,
    totaldeasistentesvotaciones,
    totaldeproyectos,
    proyectosactivossinjunta,
    infoproyecto,
    infoasistentesproyecto,
    totaldeasistentesproyecto
};
