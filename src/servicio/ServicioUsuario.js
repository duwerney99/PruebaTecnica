
const usuarioRepositorio = require('../repositorios/UsuarioRepositorio')
const encrypt = require("../utilidades/CifrarContrasena");


const registrarUsuario = async (usuario) => {
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

const inicioSesion = async (req, _) => {
    try {
        return await usuarioRepositorio.inicioSesion(req);
    } catch (e) {
        console.log("Inicio de sesion sin servicio: ", e);
        throw error;
    }
}

const obtenerUsuarios = async () => {
    try {
        return await usuarioRepositorio.obtenerUsuarios();
    } catch (e) {
        console.log("Error obteniendo usuarios ", e);
        throw error;
    }
};

const obtenerUsuarioPorId = async (usuarioId) => {
    try {
        return await usuarioRepositorio.obtenerUsuarioPorId(usuarioId);
    } catch (e) {
        console.log("Error obteniendo usuarios ", e);
        throw error;
    }
};

const actualizarUsuario = async (usuario, usuarioId) => {
    try {
        return await usuarioRepositorio.actualizarUsuario(usuario, usuarioId);
      } catch (error) {
        console.error("Error actualizando usuario:", error.message);
        throw error;
      }
}

const eliminarUsuario = async (usuarioId) => { 
    try {
        return await usuarioRepositorio.eliminarUsuario(usuarioId);
    } catch (error) {
      console.error("Error eliminado usuario:", error.message);
      throw error;
    }
  };


module.exports = {
    registrarUsuario,
    inicioSesion,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};