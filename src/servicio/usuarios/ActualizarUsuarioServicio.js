
const usuarioRepositorio = require('../../repositorios/UsuarioRepositorio')

class ActualizarUsuarioServicio {

    static async ejecutar(usuario) {
        try {
            return await usuarioRepositorio.actualizarUsuario(usuario);
          } catch (error) {
            console.error("Error actualizando usuario:", error.message);
            throw error;
          }
    }
}

module.exports = ActualizarUsuarioServicio;