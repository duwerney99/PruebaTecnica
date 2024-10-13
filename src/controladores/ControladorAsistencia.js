
const crearAsistenciaServicio = require('../servicio/asistencias/CrearAsistenciaServicio');
const obtenerAsistenciaServicio = require('../servicio/asistencias/ObtenerAsistenciaServicio');


class ControladorAsistencia {

  static async crearAsistencia(req, res) {
    try {
      const resultado = await crearAsistenciaServicio.ejecutar(req.body);
      res.send({ status: 'OK', data: resultado });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async obtenerAsistencias(req, res) {
    try {
      const resultado = await obtenerAsistenciaServicio.obtenerAsistencias();
      res.send({ status: 'OK', data: resultado })
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async obtenerAsistenciaDias(req, res) {
    try {
      const resultado = await obtenerAsistenciaServicio.obtenerAsistenciaDias();
      res.send( { status: 'OK', data: resultado})
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = ControladorAsistencia;