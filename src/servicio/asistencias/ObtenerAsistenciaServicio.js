const asistenciaRepositorio = require("../../repositorios/AsistenciaRepositorio");
const obtenerEventoServicio = require("../../servicio/eventos/ObtenerEventoServicio");
const obtenerUsuarioRepositorio = require("../../repositorios/UsuarioRepositorio");

class ObtenerAsistenciasServicio {

    static async obtenerAsistencias() {
        try {
            const resultado = await asistenciaRepositorio.obtenerAsistencias();
            return resultado
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }


    static async obtenerAsistenciaDias() {
        try {
            const eventos = await obtenerEventoServicio.obtenerEventos()
            const resultado = await asistenciaRepositorio.calcularAsistencia(eventos);
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener las asistencias ", e);
            throw new Error('Error al obtener las asistencias: ' + e.message);
        }
    }

    static async obtenerAsistencia(asistenciaId) {
        try {
            const resultado = await asistenciaRepositorio.obtenerAsistencia(asistenciaId);
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }

    
    static async obtenerAsistencia(asistenciaId) {
        try {
            const resultado = await asistenciaRepositorio.obtenerAsistencia(asistenciaId);
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }


    static async obtenerAsistenciasPorUsuario(usuarioId) {
        try {
            const asistentes = await asistenciaRepositorio.obtenerAsistenciaPorUsuario(usuarioId);
            console.log("Asistente ", asistentes)
            if (!asistentes || !Array.isArray(asistentes) || asistentes.length === 0) {
                return { success: false, message: `Asistente con ID ${usuarioId} no encontrado` };
            }
            return asistentes;    
        } catch(e) {
            console.log("No se pudo obtener la  por usuario ", e);
            throw new Error('Error al obtener la asistencia por usuario: ' + e.message);
        }
    }

    static async obtenerAsistenciaPorEvento(eventoId) {
        try {
            const resultado = await asistenciaRepositorio.obtenerAsistenciaPorEvento(eventoId);
            console.log("resultado ", resultado)
            if (!resultado || !Array.isArray(resultado) || resultado.length === 0) {
                return { success: false, message: `Evento con ID ${eventoId} no encontrado` };
            }
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }

}


module.exports = ObtenerAsistenciasServicio;