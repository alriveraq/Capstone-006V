const { obtenerInformacionUsuario } = require('../service/usuarioservice');

const obtenerInformacionUsuarioController = async (req, res) => { 
    try {
        const { id_usuario } = req.params;
        const data = await obtenerInformacionUsuario(id_usuario);
        
        if (!data) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        console.log('Obteniendo información del usuario', data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { obtenerInformacionUsuarioController };
