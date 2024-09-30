const oracle = require('oracledb');

const connection = {
    user: 'admin_janus',
    password: 'A1003',
    connectionString: 'localhost/XE', // Asegúrate de que esto sea correcto
};

async function initialize() {
    try {
        await oracle.createPool({
            user: connection.user,
            password: connection.password,
            connectString: connection.connectionString,
        });
        console.log('Conexión a la base de datos establecida.');
    } catch (err) {
        console.error('Error al conectar a la base de datos: ' + err.message);
    }
}
async function getConnection() {
    try {
        const connection = await oracle.getConnection();
        return connection;
    } catch (err) {
        console.error('Error al obtener la conexión de la piscina: ' + err.message);
        throw err;
    }
}

async function execute(query, params = []) {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute(query, params);
        return result;
    } catch (err) {
        console.error('Error al ejecutar la consulta: ' + err.message);
        throw err; // Manejar el error
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexión: ' + err.message);
            }
        }
    }
}

module.exports = { initialize, getConnection,execute };
