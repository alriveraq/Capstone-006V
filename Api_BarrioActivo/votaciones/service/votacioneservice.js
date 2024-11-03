const votacionesrepository = require('../repository/votacionesrepository');


async function crearVotacion(u_v_tema, u_v_fecha_inicio, u_v_fecha_fin, u_v_id_junta, u_v_id_usuario, enviarCorreo) {
    try {
        return await votacionesrepository.crearvotaciones(u_v_tema, u_v_fecha_inicio, u_v_fecha_fin, u_v_id_junta, u_v_id_usuario, enviarCorreo);
    } catch (error) {
        throw error;
    }
}

async function registrarvoto(u_id_votacion, u_id_usuario, u_voto_tipo) {
    try {
        return await votacionesrepository.registrarvoto(u_id_votacion, u_id_usuario, u_voto_tipo);
    } catch (error) {
        throw error;
    }
}

async function obtenerVotaciones(id_usuario) {
    const votaciones = await votacionesrepository.obtenerVotaciones(id_usuario);
    return votaciones;
}


module.exports = { crearVotacion, registrarvoto, obtenerVotaciones };
