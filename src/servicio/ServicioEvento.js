const eventoRepositorio = require('../repositorios/EventoRepositorio');
const usuarioRepositorio = require('../repositorios/UsuarioRepositorio');
const axios = require('axios');

const crearEvento = async (evento) => { 
    console.log("evento crear ", evento);
    const fechaHoy = new Date()
    const usuario = await usuarioRepositorio.consultarUsuarioPorCorreo(evento.correo);
    console.log(" user:", usuario)
    const coordenates = await obtenerCoordenadas(evento.locacion)
 
    const eventoAregistrar = {
        usuario_id: usuario[0].usuario_id,
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        creado_por: fechaHoy,
        locacion: coordenates[0] + ',' + coordenates [1],
        asistencia: 0,
        fecha_evento: evento.fecha_evento
    }
    eventoRepositorio.crearEvento(eventoAregistrar)
} 


const obtenerCoordenadas = async (direccion) => {
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
    }

}

module.exports = {
    crearEvento,
}