const infojuntarepository = require('../repository/infojuntarepository');

const obtenerInformacionPorUsuario = async (id_usuario) => {
    const id_junta = await infojuntarepository.obtenerIdJuntaPorUsuario(id_usuario);

    if (!id_junta) {
        throw new Error('Junta no encontrada para este usuario');
    }

    const informacion = await infojuntarepository.juntainformacion(id_junta);
    const usuarios = await infojuntarepository.usuariosjunta(id_junta);
    const solicitudes = await infojuntarepository.solicitudesjunta(id_junta);

    return {
        informacion,
        usuarios,
        solicitudes
    };
}

const obtenerinformacionjuta = async (id_junta) => {
    const informacion = await infojuntarepository.juntainformacion(id_junta);
    const usuarios = await infojuntarepository.usuariosjunta(id_junta);

    return {
        informacion,
        usuarios
    };
}

const obtenerTodasLasJuntasService = async () => {
    const result = await infojuntarepository.obtenerTodasLasJuntas();

    return result;
}

async function solicitarUnionJuntaService(id_usuario, id_presidente_junta, id_junta, estado, fecha_respuesta) {
    try {
        return await infojuntarepository.solicitarUnionJunta(id_usuario, id_presidente_junta, id_junta, estado, fecha_respuesta);
    } catch (error) {
        throw error;
    }
    
}

async function actualizarEstadoSolicitudUnionJuntaService(id_solicitud_union, estado) {
    try {
        return await infojuntarepository.actualizarEstadoSolicitudUnionJunta(id_solicitud_union, estado);
    } catch (error) {
        throw error;
    }
}

// usamos obtenerPublicaciones del respotory

async function traerpublicaciones(id_usuario) {
    const publicaciones = await infojuntarepository.obtenerPublicaciones(id_usuario);
    return publicaciones;
}






module.exports = { obtenerInformacionPorUsuario, obtenerTodasLasJuntasService, solicitarUnionJuntaService, obtenerinformacionjuta,actualizarEstadoSolicitudUnionJuntaService,
    traerpublicaciones
 };
