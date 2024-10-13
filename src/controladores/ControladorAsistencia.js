
const crearAsistenciaServicio = require('../servicio/asistencias/CrearAsistenciaServicio');
const obtenerAsistenciaServicio = require('../servicio/asistencias/ObtenerAsistenciaServicio');
const actualizarAsistenciaServicio = require('../servicio/asistencias/ActualizarAsistenciaServicio');


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
      res.send({ status: 'OK', data: resultado })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async obtenerAsistencia(req, res) {
    try {
      const resultado = await obtenerAsistenciaServicio.obtenerAsistencia(req.params.asistenciaId);
      res.send({ status: 'OK', data: resultado })
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  static async actualizarAsistencia(req, res) {
    try {
      const resultado = await actualizarAsistenciaServicio.ejecutar(req.params.asistenciaId);
      res.send({ status: 'OK', data: resultado })
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  // static async obtenerAsistenciaPorEvento(req, res) {
  //   try {
  //     const resultado = await obtenerAsistenciaServicio.obtenerAsistenciaPorEvento(req.params.asistenciaId);
  //     res.send({ status: 'OK', data: resultado })
  //   } catch (error) {
  //     res.status(500);
  //     res.send(error.message)
  //   }
  // }

  // static async obtenerAsistenciasPorUsuario(req, res) {
  //   try {
  //     const resultado = await obtenerAsistenciaServicio.obtenerAsistenciasPorUsuario(req.params.usuarioId);
  //     res.status(200).json({ status: 'OK', data: resultado });
  //   } catch (error) {
  //     if (error.status === 404) {
  //       res.status(404).json({
  //         message: error.message
  //       });
  //     } else {
  //       res.status(500).json({
  //         message: 'Error al obtener los asistentes del usuario'
  //       });
  //     }
  //   }
  // }
}

module.exports = ControladorAsistencia;