const loginrespository = require('../repository/loginrepository'); 
async function login(email, contrasena) {
    try {
        // Llama al repositorio para realizar el login
        return await loginrespository.login(email, contrasena);
    } catch (error) {
        throw error;
    }
}   

module.exports = {
    login
};