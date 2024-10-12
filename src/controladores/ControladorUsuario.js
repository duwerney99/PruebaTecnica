const servicio = require('../servicio/ServicioUsuario')

const registrarUsuario = async (req, res) => {
    try{
        const usuario = await servicio.registrarUsuario(req.body);
        res.send({ status: 'OK', data: usuario });
    }catch (e) {
        console.log("Error registrando el usuario ", e);
    }
}

const inicioSesion = async (req, res) => {
    try {
        const token = await servicio.inicioSesion(req.body)
        res.send({ status: 'OK', data: token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const resultado = await servicio.obtenerUsuarios();
        res.json(resultado);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const resultado = await servicio.obtenerUsuarioPorId(usuarioId);
        res.json(resultado);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    registrarUsuario,
    inicioSesion,
    obtenerUsuarios,
    obtenerUsuario,
}