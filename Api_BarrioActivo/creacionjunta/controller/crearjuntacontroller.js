const creacionjuntaservice = require('../service/creacionjuntaservice');

async function creacionjunta(req, res) {
    const { u_nombre_barrio, u_direccion, u_fecha_fundacion, id_presidente } = req.body;

    console.log('Datos recibidos:', { u_nombre_barrio, u_direccion, 
        u_fecha_fundacion, id_presidente });

    try {
        const date = new Date(u_fecha_fundacion);
        await creacionjuntaservice.creacionjunta(u_nombre_barrio, u_direccion, date, id_presidente);

        res.status(200).json({ message: 'Junta creada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la junta:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

async function crearpublicacion(req, res) {
    const { u_id_junta, u_id_usuario, u_titulo, u_contenido, u_imagen, enviarCorreo } = req.body;

    console.log('Datos recibidos:', { u_id_junta, u_id_usuario, u_titulo, u_contenido, u_imagen, enviarCorreo});

    try {
        await creacionjuntaservice.crearpublicacion(u_id_junta, u_id_usuario, u_titulo, u_contenido, u_imagen, enviarCorreo);

        res.status(200).json({ message: 'Publicación creada correctamente' });
    } catch (error) {
        console.error('Error en el controlador de la publicación:', error);
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}


module.exports = { creacionjunta, crearpublicacion };