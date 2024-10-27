const reunionesrepository = require('../repository/reunionesrepository');

async function crearReunion(u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta) {
    try {
        return await reunionesrepository.crearReunion(u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta);
    } catch (error) {
        throw error;
    }
}

async function registrarasistencia(u_id_usuario, u_id_reunion, u_asistio) {
    try {
        return await reunionesrepository.registrarasistencia(u_id_usuario, u_id_reunion, u_asistio);
    } catch (error) {
        throw error;
    }
}

async function obtenerReuniones(id_usuario) {
    const reuniones = await reunionesrepository.reunion_asistecia(id_usuario);
    return reuniones;
}




module.exports = { crearReunion, registrarasistencia, obtenerReuniones };