const {obtenerIdJuntaPorUsuario,juntainformacion,usuariosjunta,solicitudesjunta} = require('../repository/infojuntarepository');

const obtenerInformacionPorUsuario = async (id_usuario) => {
    const id_junta = await obtenerIdJuntaPorUsuario(id_usuario);

    if (!id_junta) {
        throw new Error('Junta no encontrada para este usuario');
    }

    const informacion = await juntainformacion(id_junta);
    const usuarios = await usuariosjunta(id_junta);
    const solicitudes = await solicitudesjunta(id_junta);

    return {
        informacion,
        usuarios,
        solicitudes
    };
}

module.exports = { obtenerInformacionPorUsuario };
