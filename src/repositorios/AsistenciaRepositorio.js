const { ObtenerConexion } = require('../utilidades/database/postgres');
const obtenerEventoServicio = require('../servicio/eventos/ObtenerEventoServicio');
const actualizarEventoServicio = require('../servicio/eventos/ActualizarEventoServicio');
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');

class AsistenciaRepositorio {
    static async registrarAsistencia(asistencia) {
        try {
            const evento = await obtenerEventoServicio.obtenerEventoPorId(asistencia.eventoId);
            if (!evento || evento.success === false) {
                return { success: false, message: "El evento no existe, no se puede registrar la asistencia." };
            }

            const eventoToUpdate = {
                evento_id: evento.evento_id,
                usuario_id: evento.usuario_id,
                nombre: evento.nombre,
                descripcion: evento.descripcion,
                fecha_creacion: evento.fecha_creacion,
                locacion: evento.locacion,
                asistencia: evento.asistencia + 1,
                fecha_evento: evento.fecha_evento
            };
            await actualizarEventoServicio.ejecutar(eventoToUpdate);
            const sql = `INSERT INTO pruebaTecnica.asistencia (evento_id, usuario_id, fecha) VALUES ($1, $2, $3) RETURNING *`;
            const valores = [
                asistencia.eventoId,
                asistencia.usuarioId,
                asistencia.fecha
            ];
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query(sql, valores);
            return resultado.rows;

        } catch (e) {
            console.error(`No se pudo registrar la asistencia con ID: ${asistencia}. Error:`, e.message);
            throw new Error('Error al registrar el evento: ' + e.message);
        }
    }

    static async obtenerAsistencias() {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query('SELECT * FROM pruebaTecnica.asistencia');
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo obtener las asistencias. Error:`, e.message);
            throw new Error('Error al obtener las asistencias' + e.message);
        }
    }

    static async calcularAsistencia(eventos) {
        let diasAsistencia = {
            'Domingo': 0,
            'Lunes': 0,
            'Martes': 0,
            'Miércoles': 0,
            'Jueves': 0,
            'Viernes': 0,
            'Sábado': 0
        };
        eventos.forEach(evento => {
            let dia = moment(evento.fecha_evento).format('dddd');
            dia = dia.charAt(0).toUpperCase() + dia.slice(1);
            if (!diasAsistencia.hasOwnProperty(dia)) {
                console.warn(`Día no encontrado: ${dia}`);
                return;
            }
            diasAsistencia[dia] += evento.asistencia || 0;
        });
        return diasAsistencia;
    }

    static async obtenerAsistencia(asistenciaId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query("SELECT * FROM pruebaTecnica.asistencia WHERE asistencia_id = $1", [asistenciaId]);
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo obtener la asistencia ${asistenciaId}. Error:`, e.message);
            throw new Error('Error al obtener la asistencia' + e.message);
        }
    }

    static async obtenerAsistenciaPorUsuario(usuarioId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query("SELECT * FROM pruebaTecnica.asistencia WHERE usuario_id = $1", [usuarioId]);
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo obtener las asistencias por usuario. Error:`, e.message);
            throw new Error('Error al obtener las asistencias por usuario' + e.message);
        }
    }
    
    static async obtenerAsistenciaPorEvento(eventoId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query("SELECT * FROM pruebaTecnica.asistencia WHERE evento_id = $1", [eventoId]);
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo obtener las asistencias por evento. Error:`, e.message);
            throw new Error('Error al obtener las asistencias por evento' + e.message);
        }
    }

    static async obtenerAsistencia(asistenciaId) {
        try {
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query("SELECT * FROM pruebaTecnica.asistencia WHERE asistencia_id = $1", [asistenciaId]);
            return resultado.rows;
        } catch (e) {
            console.error(`No se pudo obtener las asistencias. Error:`, e.message);
            throw new Error('Error al obtener las asistencias' + e.message);
        }
    }

    static async eliminarAsistencia(asistenciaId) {
        try {
            const conexion = await ObtenerConexion();
            const eliminarUsuarioSql = `DELETE FROM pruebaTecnica.asistencia WHERE asistencia_id = $1`;
            await conexion.query(eliminarUsuarioSql, [asistenciaId]);
          } catch (e) {
            console.error(`No se pudo eliminar la asistencia con ID: ${asistenciaId}. Error:`, e.message);
            throw new Error('Error al eliminar la asistencia: ' + e.message);
          }
    }
}

module.exports = AsistenciaRepositorio;

