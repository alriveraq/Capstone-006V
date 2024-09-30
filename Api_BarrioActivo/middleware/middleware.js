const jwt = require('jsonwebtoken');

const verificacion = (req, res, next) => {
    const token = req.headers['autorizacion'];

    if (!token) {
        return res.status(401).json({
            code: 'TOKEN_MISSING',
            message: 'No se ha enviado el token'});
        }
    try {
        const decoded = jwt.verify(token.split('')[1], process.env.jwt_secret);
        req.id = decoded.id;
        next();
    } catch (error) {
        console.error('Error en la verificacion del token:', error);
        return res.status(401).json({
            code: 'TOKEN_INVALID ',});
        }
};

module.exports = { verificacion };

