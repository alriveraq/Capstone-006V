const pandelservice = require('../service/pandelservice');


const obtenereltotaljuntas = async (req, res) => {
    try {
        const data = await pandelservice.obtenereltotaljuntas();
        console.log('Obteniendo total de juntas', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const verinformaciondejunta = async (req, res) => {
    try {
        const data = await pandelservice.verinformaciondejunta();
        console.log('Obteniendo información de juntas', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const totaldeusuariosporjunta = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.totaldeusuariosporjunta(id_junta);
        console.log('Obteniendo total de usuarios por junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const proximareunion = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.proximareunion(id_junta);
        console.log('Obteniendo próxima reunión:', JSON.stringify(data, null, 2)); // Mostrar la estructura del resultado
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No se encontró la próxima reunión.' });
        }
        res.json(data[0]); // Asegúrate de que data[0] sea un objeto adecuado para enviar
    } catch (error) {
        console.error("Error en proximareunion:", error); // Añadir log de error
        res.status(404).json({ message: error.message });
    }
}


const votacionesactivasporjunta = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.votacionesactivasporjunta(id_junta);
        console.log('Obteniendo votaciones activas por junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const proyectosactivosporjunta = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.proyectosactivosporjunta(id_junta);
        console.log('Obteniendo proyectos activos por junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const todoslosusuariosporjunta = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.todoslosusuariosporjunta(id_junta);
        console.log('Obteniendo todos los usuarios por junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const votacionesactivas = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.votacionesactivas(id_junta);
        console.log('Obteniendo votaciones activas', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const proyectosactivos = async (req, res) => {
    try {
        const { id_junta } = req.params;
        const data = await pandelservice.proyectosactivos(id_junta);
        console.log('Obteniendo proyectos activos', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// pandel de control por usuario

const totaldeusuarios = async (req, res) => {
    try {
        const data = await pandelservice.totaldeusuarios();
        console.log('Obteniendo total de usuarios', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const vertodoslosusuarios = async (req, res) => {
    try {
        const data = await pandelservice.vertodoslosusuarios();
        console.log('Obteniendo todos los usuarios', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const verinfodeusuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const data = await pandelservice.verinfodeusuario(id_usuario);
        console.log('Obteniendo información de usuario', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// panel de control reuniones

const totaldereunionesen30dias = async (req, res) => {
    try {
        const data = await pandelservice.totaldereunionesen30dias();
        console.log('Obteniendo total de reuniones en 30 días', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const detallesproximareunion = async (req, res) => {
    try {
        const data = await pandelservice.detallesproximareunion();
        console.log('Obteniendo detalles de la próxima reunión', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const inforeunion = async (req, res) => {
    try {
        const { id_reunion } = req.params;
        const data = await pandelservice.inforeunion(id_reunion);
        console.log('Obteniendo información de reunión:', data);


        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No se encontró información de la reunión.' });
        }

        res.json(data[0]);  
    } catch (error) {
        console.error("Error al obtener información de la reunión:", error);  
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}




const infoasistentesunion = async (req, res) => {
    try {
        const { id_reunion } = req.params;
        const data = await pandelservice.infoasistentesunion(id_reunion);
        console.log('Obteniendo información de asistentes a la reunión', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const totaldeasistentes = async (req, res) => {
    try {
        const { id_reunion } = req.params;
        const data = await pandelservice.totaldeasistentes(id_reunion);
        console.log('Obteniendo total de asistentes a la reunión', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//panel de control votaciones

const totaldevotaciones = async (req, res) => {
    try {
        const data = await pandelservice.totaldevotaciones();
        console.log('Obteniendo total de votaciones', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const totalvotacionesactivas = async (req, res) => {
    try {
        const data = await pandelservice.totalvotacionesactivas();
        console.log('Obteniendo total de votaciones activas', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const infovotacion = async (req, res) => {
    try {
        const { id_votacion } = req.params;
        const data = await pandelservice.infovotacion(id_votacion);
        console.log('Obteniendo información de votación', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const infoasistentesvotacion = async (req, res) => {
    try {
        const { id_votacion } = req.params;
        const data = await pandelservice.infoasistentesvotacion(id_votacion);
        console.log('Obteniendo información de asistentes a la votación', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const totaldeasistentesvotaciones = async (req, res) => {
    try {
        const { id_votacion } = req.params;
        const data = await pandelservice.totaldeasistentesvotaciones(id_votacion);
        console.log('Obteniendo total de asistentes a la votación', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// panel de control proyectos

const totaldeproyectos = async (req, res) => {
    try {
        const data = await pandelservice.totaldeproyectos();
        console.log('Obteniendo total de proyectos', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const proyectosactivossinjunta = async (req, res) => {
    try {
        const data = await pandelservice.proyectosactivossinjunta();
        console.log('Obteniendo proyectos activos sin junta', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const infoproyecto = async (req, res) => {
    try {
        const { id_proyecto } = req.params;
        const data = await pandelservice.infoproyecto(id_proyecto);
        console.log('Obteniendo información de proyecto', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const infoasistentesproyecto = async (req, res) => {
    try {
        const { id_proyecto } = req.params;
        const data = await pandelservice.infoasistentesproyecto(id_proyecto);
        console.log('Obteniendo información de asistentes a proyecto', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const totaldeasistentesproyecto = async (req, res) => {
    try {
        const { id_proyecto } = req.params;
        const data = await pandelservice.totaldeasistentesproyecto(id_proyecto);
        console.log('Obteniendo total de asistentes a proyecto', data);
        res.json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
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