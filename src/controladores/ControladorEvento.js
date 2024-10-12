const servicioEvento = require('../servicio/ServicioEvento');


class ControladorEvento {
  static async crearEvento(req, res) {
    try {
      const evento = req.body
      servicioEvento.crearEvento(evento)
      res.send({ status: 'OK', data: evento })
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: 'Error interno del servidor' });
    }

  }

  static async obtenerEventos(_req, res) {
    try {
      const resultado = await servicioEvento.obtenerEventos();
      res.send({ eventos: resultado })
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }


  static async obtenerEvento(req, res) {
    try {
      const eventoId = parseInt(req.params.eventoId, 10);
      const evento = await servicioEvento.obtenerEvento(eventoId);
      res.status(200).json({ status: 'OK', data: evento });
    } catch (error) {
      if (error.message.includes('Evento no encontrado')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: `Error interno del servidor` });
      }
    }
  };

  static async ubicacionesCercanas(req, res) {
    try {
      const resultado = await servicioEvento.ubicacionesCercanas(req.body);
      res.send({ status: 'OK', data: resultado })
    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

}



module.exports = ControladorEvento;