const reunionesservice = require('../service/reunionesservice');

async function crearReunion(req, res) {
    const { u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta, enviarCorreo} = req.body;

    console.log('Datos recibidos:', { u_tema, u_resumen, u_fecha_reunion, u_id_usuario, u_id_junta, enviarCorreo });

    try {
        const date = new Date(u_fecha_reunion);
        await reunionesservice.crearReunion(u_tema, u_resumen, date, u_id_usuario, u_id_junta, enviarCorreo);

        res.status(200).json({ message: 'Reunión creada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la reunión:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

async function registrarasistencia(req, res) {
    const { u_id_usuario, u_id_reunion, u_asistio } = req.body;

    console.log('Datos recibidos:', { u_id_usuario, u_id_reunion, u_asistio });

    try {
        await reunionesservice.registrarasistencia(u_id_usuario, u_id_reunion, u_asistio); 

        res.status(200).json({ message: 'Asistencia registrada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la asistencia:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

async function obtenerReunionescontroller(req, res) {
    try {
        const { id_usuario } = req.params;
        const data = await reunionesservice.obtenerReuniones(id_usuario);
        console.log('Obteniendo reuniones', data);
        res.json(data);
    } catch (error) {
        console.error('Error al obtener las reuniones:', error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { crearReunion, registrarasistencia, obtenerReunionescontroller };