const asistenciaRepositorio = require("../../repositorios/AsistenciaRepositorio");


class EliminarAsistenciaServicio {
    static async ejecutar(asistenciaId) {
        try {
            await asistenciaRepositorio.eliminarAsistencia(asistenciaId);
        } catch (e) {
            console.log("No se pudo obtener la asistencia ", e);
            throw new Error('Error al obtener la asistencia: ' + e.message);
        }
    }
}


module.exports = EliminarAsistenciaServicio;