
const UsuarioRepositorio = require('../repositorios/UsuarioRepositorio')


const RegistrarUsuario = async (usuario) => {
    try {
        return await UsuarioRepositorio.RegistrarUsuario(usuario);
    } catch (e) {
        console.log("Usuario sin servicio: ", e)
    }
};



module.exports = {
    RegistrarUsuario,
};