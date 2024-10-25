const infojuntaservice = require('../service/infoservice');


const obtenerInformacionJunta = async (req, res) => {

    try {
        const { id_usuario } = req.params; // Obtener el ID del usuario de los parámetros de la ruta
        const data = await infojuntaservice.obtenerInformacionPorUsuario(id_usuario);
        console.log('Obteniendo información de la junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const obtenerinfojuntaid = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await infojuntaservice.obtenerinformacionjuta(id_junta);
        console.log('Obteniendo información de la junta', data); // Log para verificar los datos

        if (!data.informacion || !data.usuarios) {
            return res.status(404).json({ message: 'No se encontró la información de la junta.' });
        }

        res.json(data); // Enviar la información obtenida
    } catch (error) {
        console.error('Error al obtener la información:', error); // Log de error
        res.status(500).json({ message: error.message }); // Respuesta de error en caso de fallo
    }
}

const obtenerTodasLasJuntasController = async (req, res) => {
    try {
        const data = await infojuntaservice.obtenerTodasLasJuntasService();
        console.log('Obteniendo todas las juntas', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


async function solicitarUnionJuntaController(req, res) {
    const { u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_solicitud} = req.body;

    console.log('Datos recibidos:', { u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_solicitud });

    try {
        await infojuntaservice.solicitarUnionJuntaService(u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_solicitud);

        res.status(200).json({ message: 'Solicitud enviada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la solicitud:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}


async function actualizarEstadoSolicitudUnionJuntaController(req, res) {
    const { id_solicitud_union } = req.params;
    const { estado } = req.body;

    console.log('Datos recibidos:', { id_solicitud_union, estado });

    try {
        await infojuntaservice.actualizarEstadoSolicitudUnionJuntaService(id_solicitud_union, estado);

        res.status(200).json({ message: 'Estado de la solicitud actualizado correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la solicitud:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

// obetener publicaciones
async function traerpublicaciones(req, res) {
    try {
        const { id_usuario } = req.params;
        const data = await infojuntaservice.traerpublicaciones(id_usuario);
        console.log('Obteniendo publicaciones', data);
        res.json(data);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ message: error.message });
    }
}








module.exports = { obtenerInformacionJunta, obtenerTodasLasJuntasController, solicitarUnionJuntaController, obtenerinfojuntaid, actualizarEstadoSolicitudUnionJuntaController, traerpublicaciones };
