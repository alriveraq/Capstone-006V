const votacionesservice = require('../service/votacioneservice');
const db = require("../../common/config/db");

async function crearVotacion(req, res) {
    const { u_v_tema, u_v_fecha_inicio, u_v_fecha_fin, u_v_id_junta, u_v_id_usuario, enviarCorreo } = req.body;

    console.log('Datos recibidos:', { u_v_tema, u_v_fecha_inicio, u_v_fecha_fin, u_v_id_junta, u_v_id_usuario, enviarCorreo });

    try {
        const dateInicio = new Date(u_v_fecha_inicio);
        const dateFin = new Date(u_v_fecha_fin);
        await votacionesservice.crearVotacion(u_v_tema, dateInicio, dateFin, u_v_id_junta, u_v_id_usuario, enviarCorreo);

        res.status(200).json({ message: 'Votación creada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la votación:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}


async function registrarVotoController(req, res) {
    const { u_id_votacion, u_id_usuario, u_voto_tipo } = req.body;

    let connection;
    try {
        connection = await db.getConnection();

        // Verificar la fecha de finalización de la votación
        const result = await connection.execute(
            `SELECT v_fecha_fin 
             FROM VOTACIONES 
             WHERE id_votaciones = :id_votacion`,
            { id_votacion: u_id_votacion }
        );

        const v_fecha_fin = result.rows[0]?.[0];

        if (!v_fecha_fin) {
            return res.status(404).json({
                code: 'VOTACION_NO_ENCONTRADA',
                message: 'La votación especificada no existe.',
            });
        }

        const fechaActual = new Date();
        if (fechaActual > v_fecha_fin) {
            return res.status(400).json({
                code: 'VOTACION_CERRADA',
                message: 'La votación ha finalizado y no se pueden registrar más votos.',
            });
        }

        // Si la votación está abierta, proceder a registrar el voto
        const response = await votacionesservice.registrarvoto(u_id_votacion, u_id_usuario, u_voto_tipo);

        res.status(200).json({
            code: 'VOTO_REGISTRADO',
            message: 'Voto registrado exitosamente.',
            data: response
        });
    } catch (error) {
        console.error("Error en el controlador de registro de voto:", error);
        res.status(500).json({
            code: 'ERROR_INTERNO',
            message: 'Error al registrar el voto.'
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error cerrando la conexión:", err);
            }
        }
    }
}

async function obtenerVotacionesController(req, res) {
    try {
        const { id_usuario } = req.params;
        const data = await votacionesservice.obtenerVotaciones(id_usuario);
        console.log('Obteniendo votaciones', data);
        res.json(data);
    } catch (error) {
        console.error('Error al obtener las votaciones:', error);
        res.status(500).json({ message: error.message });
    }
}



module.exports = { crearVotacion, registrarVotoController, obtenerVotacionesController };