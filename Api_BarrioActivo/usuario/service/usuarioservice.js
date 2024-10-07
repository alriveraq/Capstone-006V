const { informacionUsuario } = require('../repository/usuariorepository');

const obtenerInformacionUsuario = async (id_usuario) => {
    const informacion = await informacionUsuario(id_usuario); // Asegúrate de que 'informacionUsuario' devuelve algo correcto

    if (!informacion) {
        throw new Error('Usuario no encontrado');
    }

    return informacion; // Retorna la información obtenida
};

module.exports = { obtenerInformacionUsuario };
