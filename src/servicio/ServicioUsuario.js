
const usuarioRepositorio = require('../repositorios/UsuarioRepositorio')
const encrypt = require("../utilidades/CifrarContrasena");


class ServicioUsuario {
    static async registrarUsuario(usuario)  {
        try {
            const existeUsuario = await usuarioRepositorio.consultarUsuarioPorCorreo(usuario.correo);
            if (existeUsuario.length > 0 && existeUsuario[0].correo === usuario.correo) {
                return "El usuario se encuentra registrado";
            }
            const { contrasena } = usuario;
            const fechaHora = new Date();
            const constrasenaEncriptada = await encrypt.encrypt(contrasena);
            return await usuarioRepositorio.registrarUsuario(fechaHora, constrasenaEncriptada, usuario);
        } catch (e) {
            console.log("No se pudo registrar el usuario ", e);
            throw error;
        }
    };
    
    static async inicioSesion(req, _) {
        try {
            return await usuarioRepositorio.inicioSesion(req);
        } catch (e) {
            console.log("Inicio de sesion sin servicio: ", e);
            throw error;
        }
    }
    
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
            return await usuarioRepositorio.obtenerUsuarioPorId(usuarioId);
        } catch (e) {
            console.log("Error obteniendo usuarios ", e);
            throw error;
        }
    };
    
    static async actualizarUsuario(usuario, usuarioId) {
        try {
            return await usuarioRepositorio.actualizarUsuario(usuario, usuarioId);
          } catch (error) {
            console.error("Error actualizando usuario:", error.message);
            throw error;
          }
    }
    
    static async eliminarUsuario(usuarioId) { 
        try {
            return await usuarioRepositorio.eliminarUsuario(usuarioId);
        } catch (error) {
          console.error("Error eliminado usuario:", error.message);
          throw error;
        }
      };
}

module.exports = ServicioUsuario;