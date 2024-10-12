const eventoRepositorio = require('../repositorios/EventoRepositorio');
const usuarioRepositorio = require('../repositorios/UsuarioRepositorio');
const axios = require('axios');

class ServicioEvento {
    static async crearEvento(evento) {
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
            eventoRepositorio.crearEvento(eventoAregistrar);
        } catch (e) {
            console.log("No se pudo crear el evento ", e);
            throw new Error('Error al registrar el evento: ' + e.message);
        }

    }

    static async obtenerCoordenadas(direccion) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json`;
        const params = {
            access_token: process.env.MAPBOX_ACCESS_TOKEN
        };
        try {
            const response = await axios.get(url, { params });
            const lugar = response.data.features[0];
            return lugar.center;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener coordenadas: ' + e.message);
        }
    }

    static async ubicacionesCercanas(data) {
        console.log("data ", data);
        const { longitud, latitud, rango } = data
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json`;
        const params = {
            proximity: `${longitud},${latitud}`,
            types: 'poi',
            limit: 10,
            radius: rango,
            access_token: process.env.MAPBOX_ACCESS_TOKEN
        };
        try {
            const response = await axios.get(url, { params });
            return response.data.features;
        } catch (error) {
            console.error(error);
        }
    }

    static async obtenerEventos() {
        try {
            const resultado = await eventoRepositorio.obtenerEventos();
            return resultado[0];
        } catch (e) {
            console.error(error);
            throw new Error('Error al obtener coordenadas: ' + e.message);
        }
    }

    static async obtenerEvento(eventoId) {
        try {
            const rows = await eventoRepositorio.obtenerEvento(eventoId);
            if (!rows || !Array.isArray(rows) || rows.length === 0) {
                return { success: false, message: `Evento con ID ${eventoId} no encontrado` };
            }
            return rows;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = ServicioEvento;