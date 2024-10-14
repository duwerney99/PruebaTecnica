const crearEventoServicio = require('../servicio/eventos/CrearEventoServicio');
const obtenerEventoServicio = require('../servicio/eventos/ObtenerEventoServicio');
const ubicacionCercanaServicio = require('../servicio/eventos/UbicacionCercanaServicio');
const actualizarEventoServicio = require('../servicio/eventos/ActualizarEventoServicio');
const eliminarEventoServicio = require('../servicio/eventos/EliminarEventoServicio');
const cargueMasivoEventos = require('../servicio/eventos/CargueMasivoEventos');

class ControladorEvento {
  static async crearEvento(req, res) {
    try {
      const resultado = await crearEventoServicio.ejecutar(req.body);
      res.send({ status: 'OK', data: resultado });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async obtenerEventos(_req, res) {
    try {
      const resultado = await obtenerEventoServicio.obtenerEventos();
      res.send({ eventos: resultado });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async obtenerEvento(req, res) {
    try {
      const evento = await obtenerEventoServicio.obtenerEventoPorId(req.params.eventoId);
      res.status(200).json({ status: 'OK', data: evento });
    } catch (error) {
      if (error.message.includes('Evento no encontrado')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error interno del servidor` });
      }
    }
  }

  static async ubicacionesCercanas(req, res) {
    try {
      const resultado = await ubicacionCercanaServicio.obtener(req.body);
      res.send({ status: 'OK', data: resultado })
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  static async obtenerUbicacionesCercanasAlEvento(req, res) {
    try {
      const resultado = await ubicacionCercanaServicio.obtenerUbicacionCercaEvento(req.body);
      res.send({ status: resultado.status, data: resultado });
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  static async actualizarEvento(req,res) {
    try {   
        const resultado = await actualizarEventoServicio.ejecutar(req.body);
        res.send( { status: 'OK', data: resultado });
      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }
  }

  static async eliminar(req, res) {
    try {
      const resultado = await eliminarEventoServicio.ejecutar(req.params.eventoId);
      res.send({ status: 'OK', data: resultado });
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  static async creacionMasivaEventos(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send('No se ha enviado ningún archivo');
      }
  
      await cargueMasivoEventos.ejecutar(req.file.buffer)
      res.status(200).send({Status: 'OK', Message: 'Archivo Excel procesado correctamente'});
  
    } catch (e){
      console.error('Error al procesar el archivo Excel:', e);
      res.status(500).send('Error al procesar el archivo Excel');
    }
  }
}



module.exports = ControladorEvento;