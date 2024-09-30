const creacionjuntarepository = require('../repository/creacionjuntarepository');

async function creacionjunta(nombre_barrio, direccion, fecha_fundacion, id_presidente) {
    try {
        return await creacionjuntarepository.crearjunta(nombre_barrio, direccion, fecha_fundacion, id_presidente);
    } catch (error) {
        throw error;
    }
    
};

module.exports = { creacionjunta };