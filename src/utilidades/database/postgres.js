const { Pool } = require('pg');
require('dotenv').config();
 
const conexion = new Pool({
    host: process.env.CLOUD_SQL_CONNECTION_NAME ? `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}` : 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.CLOUD_SQL_CONNECTION_NAME ? 5432 : 5432, 
    ssl: process.env.CLOUD_SQL_CONNECTION_NAME ? { rejectUnauthorized: false } : false
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

