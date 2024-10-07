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
    const { u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_respuesta} = req.body;

    console.log('Datos recibidos:', { u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_respuesta });

    try {
        await infojuntaservice.solicitarUnionJuntaService(u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_respuesta);

        res.status(200).json({ message: 'Solicitud enviada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la solicitud:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}
module.exports = { obtenerInformacionJunta, obtenerTodasLasJuntasController, solicitarUnionJuntaController};
