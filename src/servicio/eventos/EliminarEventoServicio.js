const eventoRepositorio = require('../../repositorios/EventoRepositorio');

class EliminarEventoServicio {
    static async ejecutar(eventoId) {
        try {
            await eventoRepositorio.eliminar(eventoId);
            return { message: "Evento eliminado correctamente" };
        } catch (e) {
            console.error(error);
            throw new Error('Error al eliminar el evento: ' + e.message);
        }
    }
}

module.exports = EliminarEventoServicio;