const registerRepository = require('../repository/registerrepository');

async function register(rut, nombre, a_paterno, 
    a_materno, tipo_casa, adultos_mayores, integrantes, email, contrasena) {
        try {
            return await registerRepository.register(rut, nombre, a_paterno,
                 a_materno, tipo_casa, adultos_mayores, 
                 integrantes, email, contrasena);
        } catch (error) {
            throw error;
        }
    }

module.exports = { register };