const inicioSesionServicio = require("../servicio/inicio-sesion/InicioSesionServicio");

class ControladorInicioSesion {
    static async ejecutar (req, res) {
        try {
            const token = await inicioSesionServicio.generarToken(req.body)
            res.send({ status: 'OK', data: token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = ControladorInicioSesion;