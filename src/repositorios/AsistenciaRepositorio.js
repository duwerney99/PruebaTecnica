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
            throw new Error('Error al registrar la asistencia: ' + e.message);
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
            console.log("usuarioId ", usuarioId)
            const conexion = await ObtenerConexion();
            const resultado = await conexion.query("SELECT * FROM pruebaTecnica.asistencia WHERE usuario_id = $1", [usuarioId]);
            console.log("Asistente ", resultado)
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
            await conexion.query('DELETE FROM pruebaTecnica.asistencia WHERE asistencia_id = $1', [asistenciaId]);
        } catch (e) {
            console.error(`No se pudo eliminar la asistencia con ID: ${asistenciaId}. Error:`, e.message);
            throw new Error('Error al eliminar la asistencia: ' + e.message);
        }
    }

    static async actualizarAsistencia(asistencia, asistenciaId) {
        try {
            const conexion = await ObtenerConexion();

            const eventoResultado = await conexion.query("SELECT * FROM pruebaTecnica.eventos WHERE evento_id = $1", [asistencia.eventoId])
            if (eventoResultado.rows.length === 0) {
                return { success: false, message: `evento con ID ${asistencia.eventoId} no encontrado` };
            }

            const asistenciaAregistrar = {
                eventoId: asistencia.eventoId,
                usuarioId: asistencia.usuarioId,
                fecha: new Date()
            };


            const sql = `UPDATE pruebaTecnica.asistencia SET evento_id = $1, usuario_id = $2, fecha = $3 WHERE asistencia_id = $4`;
            await conexion.query(sql, [
                asistenciaAregistrar.eventoId,
                asistenciaAregistrar.usuarioId,
                asistenciaAregistrar.fecha,
                asistenciaId]);
            return { success: true, message: 'Asistencia actualizada exitosamente.' };
        } catch (e) {
            console.error(`No se pudo actualizar la asistencia con ID: ${asistencia.asistenciaId}. Error:`, e.message);
            throw new Error('Error al actualizar la asistencia: ' + e.message);
        }
    }
}

module.exports = AsistenciaRepositorio;

