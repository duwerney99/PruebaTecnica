
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
      const resultado = await usuarioRepositorio.obtenerUsuarioPorId(usuarioId);
      return resultado;
    } catch (e) {
      console.log("Error obteniendo usuarios ", e);
      throw error;
    }
  };

  static async obtenerUsuarioPorCorreo(correo) {
    try {
      const resultado = await usuarioRepositorio.obtenerUsuarioPorCorreo(correo);
      return resultado;
    } catch (e) {
      console.log("Error obteniendo usuarios ", e);
      throw error;
    }
  };
}

module.exports = ObtenerUsuarioServicio;