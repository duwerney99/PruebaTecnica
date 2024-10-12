const { ObtenerConexion } = require("../utilidades/database/postgres");

class EventoRepositorio {
    static async crearEvento(evento) {
        try {
            const conexion = await ObtenerConexion();
            const sql = `INSERT INTO pruebaTecnica.eventos (usuario_id, nombre, descripcion, creado_por, locacion, asistencia, fecha_evento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            console.log("evento ", evento)
            const valores = [
                evento.usuario_id,
                evento.nombre,
                evento.descripcion,
                evento.creado_por,
                evento.locacion,
                evento.asistencia,
                evento.fecha_evento
            ];
            await conexion.query(sql, valores);
        } catch (e) {
            console.error(`No se pudo registrar el evento con ID: ${evento.evento_id}. Error:`, e.message);
            throw new Error('Error al registrar el evento: ' + e.message);
        }
    };
    
    static async obtenerEventos() {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query('SELECT * FROM pruebaTecnica.eventos');
            return resultado.rows;
        } catch (e) {
            console.log("No se pudieron obtener los eventos: ", e);
            throw new Error('Error al registrar el evento: ' + e.message);
        }
    }
    
    static async obtenerEvento(eventoId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query('SELECT * FROM pruebaTecnica.eventos WHERE evento_id = $1', [eventoId]);
            return resultado.rows;
        } catch (e) {
            console.log("No se pudo obtener el eventoe: ", e);
            throw new Error('Error al obtener el evento: ' + e.message);
        }
    }
}

module.exports = EventoRepositorio;