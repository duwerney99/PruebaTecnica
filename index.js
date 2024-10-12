require('dotenv').config();
const express = require("express");
const { swaggerDocs } = require('./swagger');

const rutasUsuario = require('./src/rutas/RutasUsuario');
const rutaEventos = require('./src/rutas/RutaEventos');
const app = express();
const PORT = process.env.PORT || 8083;

app.use(express.json());
app.use('/api', rutasUsuario);
app.use('/api', rutaEventos);


const IniciarServidor = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
            swaggerDocs(app, PORT);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}

IniciarServidor()