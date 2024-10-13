const axios = require('axios');


class ObtenerCoordenadas {
    static async obtenerCoordenadas(direccion) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(direccion)}.json`;
        const params = {
            access_token: process.env.MAPBOX_ACCESS_TOKEN
        };
        try {
            const response = await axios.get(url, { params });
            const lugar = response.data.features[0];
            return lugar.center;
        } catch (e) {
            console.error(e);
            throw new Error('Error al obtener coordenadas: ' + e.message);
        }
    }
    
}

module.exports = ObtenerCoordenadas;