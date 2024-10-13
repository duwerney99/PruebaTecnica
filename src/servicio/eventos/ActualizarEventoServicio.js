
const eventoRepositorio = require('../../repositorios/EventoRepositorio');

class ActualizarEventoServicio {
    static async ejecutar(evento) {
        try {
            await eventoRepositorio.actulizarEvento(evento);
            return { message: "Evento actualizado correctamente" };
        } catch (e) {
            console.error(error);
            throw new Error('Error al obtener eliminar el evento: ' + e.message);
        }
    }
}

module.exports = ActualizarEventoServicio;