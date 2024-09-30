const { obtenerInformacionPorUsuario } = require('../service/infoservice');

const obtenerInformacionJunta = async (req, res) => {

    try {
        const { id_usuario } = req.params; // Obtener el ID del usuario de los parámetros de la ruta
        const data = await obtenerInformacionPorUsuario(id_usuario);
        console.log('Obteniendo información de la junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { obtenerInformacionJunta };
