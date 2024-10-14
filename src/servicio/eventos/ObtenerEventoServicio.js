const eventoRepositorio = require('../../repositorios/EventoRepositorio');

class ObtenerEventoServicio {
    static async obtenerEventos() {
        try {
            const resultado = await eventoRepositorio.obtenerEventos();
            return resultado;
        } catch (e) {
            console.error(e);
            throw new Error('Error al obtener coordenadas: ' + e.message);
        }
    }

    static async obtenerEventoPorId(eventoId) {
        try {
            const rows = await eventoRepositorio.obtenerEventoPorId(eventoId);
            if (!rows || !Array.isArray(rows) || rows.length === 0) {
                return { success: false, message: `Evento con ID ${eventoId} no encontrado` };
            }
            return rows;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = ObtenerEventoServicio;