const asistenciaRepositorio = require("../../repositorios/AsistenciaRepositorio");
const obtenerEventoServicio = require("../../servicio/eventos/ObtenerEventoServicio");

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
            const  resultado = await asistenciaRepositorio.calcularAsistencia(eventos);
            return resultado;
          } catch (e) {
            console.log("No se pudo obtener las asistencias ", e);
            throw new Error('Error al obtener las asistencias: ' + e.message);
          }
    }

}


module.exports = ObtenerAsistenciasServicio;