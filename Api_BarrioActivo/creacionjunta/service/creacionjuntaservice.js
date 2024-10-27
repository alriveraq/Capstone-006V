const creacionjuntarepository = require('../repository/creacionjuntarepository');

async function creacionjunta(nombre_barrio, direccion, fecha_fundacion, id_presidente) {
    try {
        return await creacionjuntarepository.crearjunta(nombre_barrio, direccion, fecha_fundacion, id_presidente);
    } catch (error) {
        throw error;
    }
    
};


async function crearpublicacion(id_junta, id_usuario, contenido, titulo, imagen, enviarCorreo) {
    try {
        return await creacionjuntarepository.crearpublicacion(id_junta, id_usuario, contenido, titulo, imagen, enviarCorreo);
    } catch (error) {
        throw error;
    }
}


module.exports = { creacionjunta, crearpublicacion };