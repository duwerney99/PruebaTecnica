const asistenciaRepositorio = require("../../repositorios/AsistenciaRepositorio");



class ActualizarAsistenciaServicio {
    static async ejecutar(asistencia) {
        try {
            const resultado = await asistenciaRepositorio.actualizarAsistencia(asistencia);
            return resultado;
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }
}


module.exports = ActualizarAsistenciaServicio;