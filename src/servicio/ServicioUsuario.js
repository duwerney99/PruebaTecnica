
const UsuarioRepositorio = require('../repositorios/UsuarioRepositorio')


const RegistrarUsuario = async (usuario) => {
    try {
        return await UsuarioRepositorio.RegistrarUsuario(usuario);
    } catch (e) {
        console.log("Usuario sin servicio: ", e)
    }
};


const InicioSesion = async (req,res) => {
    try{
        return await UsuarioRepositorio.InicioSesion(req);
    }catch(e) {
        console.log("Inicio de sesion sin servicio: ", e)
    }
}



module.exports = {
    RegistrarUsuario,
    InicioSesion
};