// SolicitudController.js

const solicitudrepository = require('../repository/solicitudrepository');

async function crearSolicitud(data) {
    try {
        const resultado = await solicitudrepository.crearSolicitud(data);
        return resultado;
    } catch (error) {
        console.error('Error en SolicitudService:', error.message);
        throw new Error(error.message);
    }
}

async function obtenersolicitudes(id_usuario) {
    try {
        const resultado = await solicitudrepository.obtenersolicitudes(id_usuario);
        return resultado;
    } catch (error) {
        console.error('Error en SolicitudService:', error.message);
        throw new Error(error.message);
    }
}

async function actualizarestadosolicitud(u_id_solicitud, u_estado) {
    try {
        const resultado = await solicitudrepository.actualizarestadosolicitud(u_id_solicitud, u_estado);
        return resultado;
    } catch (error) {
        console.error('Error en SolicitudService:', error.message);
        throw new Error(error.message);
    }
    
}


module.exports = { crearSolicitud, obtenersolicitudes, actualizarestadosolicitud };
