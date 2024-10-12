const usuarioRepositorio = require('../../repositorios/UsuarioRepositorio');
const encrypt = require("../../utilidades/CifrarContrasena");

class RegistrarUsuarioServicio {

  static async ejecutar(usuario) {
    try {
      const existeUsuario = await usuarioRepositorio.consultarUsuarioPorCorreo(usuario.correo);
      if (existeUsuario.length > 0) return "El usuario se encuentra registrado";
      const { contrasena } = usuario;
      const fechaHora = new Date();
      const constrasenaEncriptada = await encrypt.encrypt(contrasena);
      return await usuarioRepositorio.registrarUsuario(fechaHora, constrasenaEncriptada, usuario);
    } catch (error) {
      console.error("Error actualizando usuario:", error.message);
      throw error;
    }
  }
}

module.exports = RegistrarUsuarioServicio;