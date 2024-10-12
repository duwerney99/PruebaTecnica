
const usuarioRepositorio = require('../../repositorios/UsuarioRepositorio')

class EliminarUsuarioServicio {

    static async ejecutar(usuarioId) {
        try {
            await usuarioRepositorio.eliminarUsuario(usuarioId);
            return { message: "Usuario eliminado correctamente" };
          } catch (error) {
            console.error("Error actualizando usuario:", error.message);
            throw error;
          }
    }
}

module.exports = EliminarUsuarioServicio;