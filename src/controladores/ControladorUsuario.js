const actualizarUsuario = require('../servicio/usuarios/ActualizarUsuarioServicio');
const registrarUsuario = require('../servicio/usuarios/RegistrarUsuarioServicio');
const obtenerUsuario = require('../servicio/usuarios/ObtenerUsuarioServicio');
const eliminarUsuario = require('../servicio/usuarios/EliminarUsuarioServicio');
const inicioSesionServicio = require('../servicio/inicio-sesion/InicioSesionServicio');

class ControladorUsuario {
    static async registrarUsuario(req, res) {
        try {
            const usuario = await registrarUsuario.ejecutar(req.body);
            res.send({ status: 'OK', data: usuario });
        } catch (e) {
            console.log("Error registrando el usuario ", e);
        }
    }

    static async inicioSesion (req, res) {
        try {
            const token = await inicioSesionServicio.generarToken(req.body)
            res.send({ status: 'OK', data: token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async obtenerUsuarios (req, res) {
        try {
            const resultado = await obtenerUsuario.obtenerUsuarios();
            res.json(resultado);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    static async obtenerUsuario (req, res) {
        try {
            const { usuarioId } = req.params;
            const resultado = await obtenerUsuario.obtenerUsuarioPorId(usuarioId);
            res.json(resultado);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    static async actualizarUsuario (req, res) {
        try {
            actualizarUsuario.ejecutar(req.body);
            res.send({ status: 'OK', data: req.body });
        } catch (e) {
            console.log("Error actualizando usuario ", e);
        }
    }

    static async eliminarUsuario (req, res) {
        try {
            const resultado = await eliminarUsuario.ejecutar(req.params.usuarioId);
            res.send({ status: "OK", data: resultado });
        } catch (e) {
            if (e.message.includes('No se pudo verificar la existencia del usuario')) {
                res.status(500).json({ error: 'Error interno del servidor' });
            } else if (e.message.includes('Usuario con ID')) {
                res.status(404).json({ error: e.message });
            } else {
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    };
}

module.exports = ControladorUsuario

