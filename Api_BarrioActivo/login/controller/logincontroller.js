const loginservice = require('../service/loginservice');
const jwt = require('jsonwebtoken');
async function login(req, res) {

    const { u_email, u_contrasena} = req.body;

    
    console.log('Datos recibidos:', { u_email, u_contrasena });

    try {
        const id = await loginservice.login(u_email, u_contrasena);

        const token = jwt.sign({ id }, 'token', {expiresIn: 60 * 60 * 24});
        
        res.status(200).json({ id, token });
    } catch (error) {
        console.error('Error en el controlador del login', error);
        return res.status(400).json({
            code: error.code,
            message: error.message
        })
    }
}

module.exports = { login };