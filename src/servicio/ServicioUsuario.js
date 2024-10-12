
const usuarioRepositorio = require('../repositorios/UsuarioRepositorio')
const encrypt = require("../utilidades/CifrarContrasena");


const registrarUsuario = async (usuario) => {
    try {
        const existeUsuario = await usuarioRepositorio.consultarUsuarioPorCorreo(usuario.correo);
        if (existeUsuario) return "El usuario se encuentra registrado";
        const { contrasena } = usuario;
        const fechaHora = new Date();
        const constrasenaEncriptada = await encrypt.encrypt(contrasena);
        return await usuarioRepositorio.registrarUsuario(fechaHora, constrasenaEncriptada, usuario);
    } catch (e) {
        console.log("No se pudo registrar el usuario ", e);
    }
};

const inicioSesion = async (req, _) => {
    try {
        return await usuarioRepositorio.inicioSesion(req);
    } catch (e) {
        console.log("Inicio de sesion sin servicio: ", e);
    }
}

const obtenerUsuarios = async () => {
    try {
        return await usuarioRepositorio.obtenerUsuarios();
    } catch (e) {
        console.log("Error obteniendo usuarios ", e);
    }
};

const obtenerUsuarioPorId = async (usuarioId) => {
    try {
        return await usuarioRepositorio.obtenerUsuarioPorId(usuarioId);
    } catch (e) {
        console.log("Error obteniendo usuarios ", e);
    }
};

module.exports = {
    registrarUsuario,
    inicioSesion,
    obtenerUsuarios,
    obtenerUsuarioPorId,
};