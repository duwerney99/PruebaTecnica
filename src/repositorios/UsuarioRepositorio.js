const { ObtenerConexion } = require('../utilidades/database/postgres');
const encrypt = require("../utilidades/CifrarContrasena");
const jwt = require("jsonwebtoken");


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




const InicioSesion = async (user) => {
    const { nombre, contrasena } = user;

        const accessToken = jwt.sign(
          {
            nombre: nombre,
            id: contrasena,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60m" }
        );
   
        const refreshToken = jwt.sign(
          {
            nombre: nombre,
            id: contrasena,
          },
          process.env.REFRESH_TOKEN_SECRET
        );
        return { accessToken, refreshToken };
  };


module.exports = {
    RegistrarUsuario,
    InicioSesion
};