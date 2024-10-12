const { ObtenerConexion } = require("../utilidades/database/postgres");



const crearEvento = async (evento) => {
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


module.exports = {
    crearEvento,
}