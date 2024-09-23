const registerservice = require('../service/registerservice');

async function register(req, res) {
    const { u_rut, u_nombre, u_a_paterno, u_a_materno,
         u_tipo_casa, u_adultos_mayores, u_integrantes, 
         u_email, u_contrasena } = req.body;

    console.log('Datos recibidos:', { u_rut, u_nombre, u_a_paterno, u_a_materno, u_tipo_casa, u_adultos_mayores, u_integrantes, u_email, u_contrasena });

    try {
        await registerservice.register(u_rut, u_nombre, u_a_paterno, u_a_materno, u_tipo_casa, u_adultos_mayores, u_integrantes, u_email, u_contrasena);

        res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error en el controlador del registro:', error); 
        return res.status(500).json({
            code: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error interno en el servidor',
        });
    }
}

module.exports = { register };
