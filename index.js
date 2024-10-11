require('dotenv').config();
const express = require("express");
const { ObtenerConexion } = require('./src/utilidades/database/postgres');
const { swaggerDocs } = require('./swagger');

const rutasUsuario = require('./src/rutas/RutasUsuario');



const app = express();

const PORT = process.env.PORT || 8083;

app.use(express.json());

app.use('/api/usuarios', rutasUsuario);




const IniciarServidor = async () => {
    try {
        await ObtenerConexion();  
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en el puerto ${PORT}`);
            swaggerDocs(app, PORT);
        });
    } catch (err) {
        console.error('No se pudo iniciar el servidor debido a un error en la base de datos:', err);
    }
}

IniciarServidor()