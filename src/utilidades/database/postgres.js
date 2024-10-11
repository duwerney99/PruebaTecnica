const { Pool } = require('pg');
require('dotenv').config();
 
const conexion = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'pruebaTecnica',
    port: 5432
});
 
const ObtenerConexion = async () => {
    try {
        return conexion;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};
 
module.exports = {
    ObtenerConexion
};