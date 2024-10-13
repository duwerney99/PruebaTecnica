const { ObtenerConexion } = require("../utilidades/database/postgres");
const { obtenerCoordenadas } = require('../utilidades/ObtenerCoordenads');

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
            const resultado = await conexion.query(sql, valores);
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo registrar el evento con nombre: ${evento.nombre}. Error:`, e.message);
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
            throw new Error('Error al obtener el evento: ' + e.message);
        }
    }
    
    static async obtenerEventoPorId(eventoId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query('SELECT * FROM pruebaTecnica.eventos WHERE evento_id = $1', [eventoId]);
            return resultado.rows;
        } catch (e) {
            console.log("No se pudo obtener el eventoe: ", e);
            throw new Error('Error al obtener el evento: ' + e.message);
        }
    }

    static async eliminar(eventoId) {
        try {
            const conexion = await ObtenerConexion();
            await conexion.query('DELETE FROM pruebaTecnica.eventos WHERE evento_id = $1', [eventoId]);
        } catch (e) {
            console.log("No se pudo eliminar el evento: ", e);
            throw new Error('Error al eliminar el evento: ' + e.message);
        }
    }

    static async actulizarEvento(evento) {
        try{
            const fechaHoy = new Date();
            const coordenates = await obtenerCoordenadas(evento.locacion)
            if (evento.usuarioId) {
                const eventoAregistrar = {
                    nombre: evento.nombre,
                    descripcion: evento.descripcion,
                    creado_por: fechaHoy,
                    locacion: coordenates[0] + ',' + coordenates[1],
                    asistencia: evento.asistencia,
                    fecha_evento: evento.fecha_evento
                }
                const sql = `UPDATE pruebaTecnica.eventos SET nombre = $1, descripcion = $2, creado_por = $3, locacion = $4, asistencia = $5, fecha_evento = $6 WHERE evento_id = $7`;
                const conexion = await ObtenerConexion();
                await conexion.query(sql, [
                    eventoAregistrar.nombre,
                    eventoAregistrar.descripcion,
                    eventoAregistrar.creado_por,
                    eventoAregistrar.locacion,
                    eventoAregistrar.asistencia,
                    eventoAregistrar.fecha_evento,
                    evento.eventoId
                ]);
            } else {
                return { status: 'Error' };
            }
        } catch(e) {
            console.log("No se pudo actualizar el evento: ", e);
            throw new Error('Error al actualizar el evento: ' + e.message);
        }
        
    } 
}

module.exports = EventoRepositorio;