const usuarioRepositorio = require('../../repositorios/UsuarioRepositorio');
const eventoRepositorio = require('../../repositorios/EventoRepositorio');
const { obtenerCoordenadas } = require('../../utilidades/ObtenerCoordenads');


class CrearEventoServicio {
    static async ejecutar(evento) {
        try {
            const fechaHoy = new Date()
            const usuario = await usuarioRepositorio.consultarUsuarioPorCorreo(evento.correo);
            const coordenates = await obtenerCoordenadas(evento.locacion);
            const eventoAregistrar = {
                usuario_id: usuario[0].usuario_id,
                nombre: evento.nombre,
                descripcion: evento.descripcion,
                creado_por: fechaHoy,
                locacion: coordenates[0] + ',' + coordenates[1],
                asistencia: 0,
                fecha_evento: evento.fecha_evento
            };
            return await eventoRepositorio.crearEvento(eventoAregistrar);
        } catch (e) {
            console.log("No se pudo crear el evento ", e);
            throw new Error('Error al registrar el evento: ' + e.message);
        }
    }
}

module.exports = CrearEventoServicio;