const { ObtenerConexion } = require('../utilidades/database/postgres');
const jwt = require("jsonwebtoken");

const registrarUsuario = async (fecha, constrasenaEncriptada, usuario) => {
  try {
    const sql = `INSERT INTO pruebaTecnica.usuarios (correo, contrasena, nombre, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [usuario.correo, constrasenaEncriptada, usuario.nombre, fecha];
    const conexion = await ObtenerConexion();
    try {
      const resultado = await conexion.query(sql, valores);
      return resultado.rows[0];
    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
  } catch (e) {
    console.log("Usuario sin servicio: ", e);
    throw new Error('Fallo la conexion');
  }
};

const consultarUsuarioPorCorreo = async (correo) => {
  try {
    const sql = `SELECT * FROM pruebaTecnica.usuarios WHERE correo = $1`;
    const conexion = await ObtenerConexion();
    const resultado = await conexion.query(sql, [correo]);
    return resultado.rows.length > 0;
  } catch (e) {
    console.log("Error consultando usuario ", e);
    throw new Error('Fallo la conexion');
  }
}

const inicioSesion = async (user) => {
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

const obtenerUsuarios = async () => {
  try {
    const conexion = await ObtenerConexion();
    const result = await conexion.query("SELECT * FROM pruebaTecnica.usuarios");
    return result.rows;
  } catch (e) {
    console.log("No se pudo traer los usuarios ", e)
    throw new Error('Fallo la conexion');
  }
};

const obtenerUsuarioPorId = async (usuarioId) => {
  const connection = await ObtenerConexion();
  const result = await connection.query("SELECT * FROM pruebaTecnica.usuarios WHERE usuario_id = $1", [usuarioId] );
  return result.rows;
};

module.exports = {
  registrarUsuario,
  inicioSesion,
  obtenerUsuarios,
  consultarUsuarioPorCorreo,
  obtenerUsuarioPorId
};