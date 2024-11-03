const pandelrespository = require('../repository/pandelrespository'); // Asegúrate de tener la ruta correcta a tu repositorio.

// pandel de control por junta
async function obtenereltotaljuntas () {
    const totaljuntas = await pandelrespository.obtenereltotaljuntas();
    return totaljuntas;
}

async function verinformaciondejunta () {
    const informacionjunta = await pandelrespository.verinformaciondejunta();
    return informacionjunta;
}

async function totaldeusuariosporjunta (id_junta) {
    const totalusuarios = await pandelrespository.totaldeusuariosporjunta(id_junta);
    return totalusuarios;
}

async function proximareunion(id_junta) {
    const proximareunion = await pandelrespository.proximareunion(id_junta);
    return proximareunion;
}

async function votacionesactivasporjunta(id_junta) {
    const votacionesactivas = await pandelrespository.votacionesactivasporjunta(id_junta);
    return votacionesactivas;
}

async function proyectosactivosporjunta(id_junta) {
    const proyectosactivos = await pandelrespository.proyectosactivosporjunta(id_junta);
    return proyectosactivos;
}

async function todoslosusuariosporjunta(id_junta) {
    const todoslosusuarios = await pandelrespository.todoslosusuariosporjunta(id_junta);
    return todoslosusuarios;
}

async function votacionesactivas(id_junta) {
    const votacionesactivas = await pandelrespository.votacionesactivas(id_junta);
    return votacionesactivas;
}

async function proyectosactivos(id_junta) {
    const proyectosactivos = await pandelrespository.proyectosactivos(id_junta);
    return proyectosactivos;
}

//panel de control por usuario

async function totaldeusuarios () {
    const totalusuarios = await pandelrespository.totaldeusuarios();
    return totalusuarios;
}

async function vertodoslosusuarios () {
    const totaljuntas = await pandelrespository.vertodoslosusuarios();
    return totaljuntas;
}

async function verinfodeusuario(id_usuario) {
    const proximareunion = await pandelrespository.verinfodeusuario(id_usuario);
    return proximareunion;
}

//panel de control reuniones

async function totaldereunionesen30dias () {
    const totalreuniones = await pandelrespository.totaldereunionesen30dias();
    return totalreuniones;
}

async function detallesproximareunion () {
    const detallesreunion = await pandelrespository.detallesproximareunion();
    return detallesreunion;
}

async function inforeunion (id_reunion) {
    const inforeunion = await pandelrespository.inforeunion(id_reunion);
    return inforeunion;
}

async function infoasistentesunion (id_reunion) {
    const infoasistentes = await pandelrespository.infoasistentesunion(id_reunion);
    return infoasistentes;
}

async function totaldeasistentes (id_reunion) {
    const infovotaciones = await pandelrespository.totaldeasistentes(id_reunion);
    return infovotaciones;
}

// pandel de control votaciones

async function totaldevotaciones () {
    const totalvotaciones = await pandelrespository.totaldevotaciones();
    return totalvotaciones;
}

async function totalvotacionesactivas () {
    const totalvotacionesactivas = await pandelrespository.totalvotacionesactivas();
    return totalvotacionesactivas;
}

async function infovotacion (id_votacion) {
    const infovotacion = await pandelrespository.infovotacion(id_votacion);
    return infovotacion;
}

async function infoasistentesvotacion (id_votacion) {
    const infoasistentes = await pandelrespository.infoasistentesvotacion(id_votacion);
    return infoasistentes;
}

async function totaldeasistentesvotaciones (id_votacion) {
    const totalasistentes = await pandelrespository.totaldeasistentesvotaciones(id_votacion);
    return totalasistentes;
}

// panel de control proyectos

async function totaldeproyectos () {
    const totalproyectos = await pandelrespository.totaldeproyectos();
    return totalproyectos;
}

async function proyectosactivossinjunta () {
    const totalproyectosactivos = await pandelrespository.proyectosactivossinjunta();
    return totalproyectosactivos;
}

async function infoproyecto (id_proyecto) {
    const infoproyecto = await pandelrespository.infoproyecto(id_proyecto);
    return infoproyecto;
}

async function infoasistentesproyecto (id_proyecto) {
    const infoasistentes = await pandelrespository.infoasistentesproyecto(id_proyecto);
    return infoasistentes;
}

async function totaldeasistentesproyecto (id_proyecto) {
    const totalasistentes = await pandelrespository.totaldeasistentesproyecto(id_proyecto);
    return totalasistentes;
}








module.exports = {
    obtenereltotaljuntas,
    verinformaciondejunta,
    totaldeusuariosporjunta,
    proximareunion,
    votacionesactivasporjunta,
    proyectosactivosporjunta,
    todoslosusuariosporjunta,
    votacionesactivas,
    proyectosactivos,
    totaldeusuarios,
    vertodoslosusuarios,
    verinfodeusuario,
    totaldereunionesen30dias,
    detallesproximareunion,
    inforeunion,
    infoasistentesunion,
    totaldeasistentes,
    totaldevotaciones,
    totalvotacionesactivas,
    infovotacion,
    infoasistentesvotacion,
    totaldeasistentesvotaciones,
    totaldeproyectos,
    proyectosactivossinjunta,
    infoproyecto,
    infoasistentesproyecto,
    totaldeasistentesproyecto
};

