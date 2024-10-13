const axios = require('axios');
const obtenerEventoServicio = require('../../servicio/eventos/ObtenerEventoServicio');


class UbicacionCercanaServicio {
    static async obtener(data) {
        const { longitud, latitud, rango } = data
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json`;
        const params = {
            proximity: `${longitud},${latitud}`,
            types: 'poi',
            limit: 5,
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

    static async obtenerUbicacionCercaEvento(data) {
        try {
            const { eventoId, rango } = data;
            const evento = await obtenerEventoServicio.obtenerEventoPorId(eventoId);
            console.log("locacion ", evento)
            if (evento.length === 0 || evento.success === false) return { status: "404", data: "El evento no existe" };
            const locacion = evento[0].locacion;
            const listaCoordenadas = locacion.split(',');
            let longitud = parseFloat(listaCoordenadas[0]);
            let latitud = parseFloat(listaCoordenadas[1]);
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitud},${latitud}.json`;
            const params = {
                proximity: `${longitud},${latitud}`,
                types: 'poi',
                limit: 5,
                radius: rango,
                access_token: process.env.MAPBOX_ACCESS_TOKEN
            };
            const respuesta = await axios.get(url, { params });
            return respuesta.data.features;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = UbicacionCercanaServicio;