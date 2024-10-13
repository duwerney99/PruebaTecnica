const asistenciaRepositorio = require("../../repositorios/AsistenciaRepositorio");



class ActualizarAsistenciaServicio {
    static async ejecutar(asistenciaId) {
        try {
            const resultado = await asistenciaRepositorio.obtenerAsistencia(asistenciaId);
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }
}


module.exports = ActualizarAsistenciaServicio;