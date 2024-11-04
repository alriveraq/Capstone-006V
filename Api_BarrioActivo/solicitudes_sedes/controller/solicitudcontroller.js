const SolicitudService = require('../service/solicitudservice');

async function crearSolicitud(req, res) {
    try {
        const { id_usuario, id_junta, tipo_solicitud, fecha_inicio, fecha_fin, descripcion } = req.body;
        console.log('Datos recibidos:', { id_usuario, id_junta, tipo_solicitud, fecha_inicio, fecha_fin, descripcion });
        const resultado = await SolicitudService.crearSolicitud({
            id_usuario,
            id_junta,
            tipo_solicitud,
            fecha_inicio,
            fecha_fin,
            descripcion
        });

        res.status(201).json({ message: resultado.mensaje });
    } catch (error) {
        console.error('Error en SolicitudController:', error.message);
        res.status(500).json({ message: 'Error al crear la solicitud' });
    }
}

async function obtenersolicitudes(req, res) {
    try {
        const { id_usuario } = req.params;
        console.log('Datos recibidos:', { id_usuario });
        const resultado = await SolicitudService.obtenersolicitudes(id_usuario);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error en SolicitudController:', error.message);
        res.status(500).json({ message: 'Error al obtener las solicitudes' });
    }
}

async function actualizarestadosolicitud(req, res) {
    try {
        const { u_id_solicitud, u_estado } = req.body;
        console.log('Datos recibidos:', { u_id_solicitud, u_estado });
        const resultado = await SolicitudService.actualizarestadosolicitud(u_id_solicitud, u_estado);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error en SolicitudController:', error.message);
        res.status(500).json({ message: 'Error al actualizar el estado de la solicitud' });
    }
}

module.exports = { crearSolicitud, obtenersolicitudes, actualizarestadosolicitud };
