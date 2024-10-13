
const usuarioRepositorio = require('../../repositorios/UsuarioRepositorio')

class ObtenerUsuarioServicio {
  static async obtenerUsuarios() {
    try {
      return await usuarioRepositorio.obtenerUsuarios();
    } catch (e) {
      console.log("Error obteniendo usuarios ", e);
      throw error;
    }
  };

  static async obtenerUsuarioPorId(usuarioId) {
    try {
      return resultado = await usuarioRepositorio.obtenerUsuarioPorId(usuarioId);
    } catch (e) {
      console.log("Error obteniendo usuarios ", e);
      throw error;
    }
  };

  static async obtenerUsuarioPorCorreo(correo) {
    try {
      return resultado = await usuarioRepositorio.obtenerUsuarioPorCorreo(correo);
    } catch (e) {
      console.log("Error obteniendo usuarios ", e);
      throw error;
    }
  };
}

module.exports = ObtenerUsuarioServicio;