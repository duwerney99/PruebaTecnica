const servicioEvento = require('../servicio/ServicioEvento');



const crearEvento = (req,res) => {
    try {
        const evento  = req.body
        servicioEvento.crearEvento(evento)
        res.send( { status: 'OK', data: evento})
      } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Error interno del servidor' });
      }

}

module.exports = {
    crearEvento,
}