const asistenciaRepositorio = require('../../repositorios/AsistenciaRepositorio');

class CrearAsistenciaServicio {
  static async ejecutar(asistencia) {
    try {
      const resultado = await asistenciaRepositorio.registrarAsistencia(asistencia);
      return resultado
    } catch (e) {
      console.log("No se pudo crear la asistencia ", e);
      throw new Error('Error al registrar la asistencia: ' + e.message);
    }
  }
}


module.exports = CrearAsistenciaServicio;