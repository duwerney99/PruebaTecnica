const { ObtenerConexion } = require('../utilidades/database/postgres');
const encrypt = require("../utilidades/CifrarContrasena");


const RegistrarUsuario = async (usuario) => {
    const { correo, contrasena, nombre } = usuario;

    const fecha_hora = new Date();


    const encriptarcontrasena = await encrypt.encrypt(contrasena);

    const sql = `INSERT INTO pruebaTecnica.usuarios (correo, contrasena, nombre, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [correo, encriptarcontrasena, nombre, fecha_hora];

    const conexion = await ObtenerConexion();

    try {
        const resultado = await conexion.query(sql, valores);
        console.log('Usuario registrado:', resultado.rows[0]);
        return resultado.rows[0];
    } catch (error) {
        console.error('Error registrando usuario:', error);
        throw error;
    }
};



module.exports = {
    RegistrarUsuario
};