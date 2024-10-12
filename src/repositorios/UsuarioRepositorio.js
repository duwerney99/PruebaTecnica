const { ObtenerConexion } = require('../utilidades/database/postgres');
const jwt = require("jsonwebtoken");
const encrypt = require("../utilidades/CifrarContrasena");

const registrarUsuario = async (fecha, constrasenaEncriptada, usuario) => {
  try {
    const sql = `INSERT INTO pruebaTecnica.usuarios (correo, contrasena, nombre, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [usuario.correo, constrasenaEncriptada, usuario.nombre, fecha];
    const conexion = await ObtenerConexion();
    try {
      const resultadoado = await conexion.query(sql, valores);
      return resultadoado.rows[0];
    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
  } catch (e) {
    console.error(`No se pudo registrar el usuario con ID: ${usuario.correo}. Error:`, e.message);
    throw new Error('Error al registrar el usuario: ' + e.message);
  }
};

const consultarUsuarioPorCorreo = async (correo) => {
  try {
    const sql = `SELECT * FROM pruebaTecnica.usuarios WHERE correo = $1`;
    const conexion = await ObtenerConexion();
    const resultadoado = await conexion.query(sql, [correo]);
    return resultadoado.rows;
  } catch (e) {
    console.error(`No se pudo consultar el usuario con correo: ${correo}. Error:`, e.message);
    throw new Error('Error al consultar el usuario: ' + e.message);
  }
}

const inicioSesion = async (usuario) => {
  const { nombre, contrasena } = usuario;
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
    const resultado = await conexion.query("SELECT * FROM pruebaTecnica.usuarios");
    return resultado.rows;
  } catch (e) {
    console.error(`No se pudo obtener los usuarios, Error:`, e.message);
    throw new Error('Error al obtener los usuarios: ' + e.message);
  }
};

const obtenerUsuarioPorId = async (usuarioId) => {
  try {
    const conexion = await ObtenerConexion();
    const resultado = await conexion.query("SELECT * FROM pruebaTecnica.usuarios WHERE usuario_id = $1", [usuarioId]);
    return resultado.rows;
  } catch (e) {
    console.error(`No se pudo obtener el usuario con ID: ${usuarioId}. Error:`, e.message);
    throw new Error('Error al obtener el usuario: ' + e.message);
  }

};


const actualizarUsuario = async (usuario, usuarioId) => {
  try {
    const conexion = await ObtenerConexion();

    const usuarioActualizar = {
      contrasena: await encrypt.encrypt(usuario.contrasena),
      nombre: usuario.nombre,
      fecha_registro: new Date(),
    };
    const sql = `UPDATE pruebaTecnica.usuarios SET contrasena = $1, nombre = $2, fecha_registro = $3 WHERE usuario_id = $4`;
    await conexion.query(sql, [
      usuarioActualizar.contrasena,
      usuarioActualizar.nombre,
      usuarioActualizar.fecha_registro,
      usuarioId
    ]);
    console.log(`Usuario con ID: ${usuarioId} actualizado correctamente.`);
  } catch (e) {
    console.error(`No se pudo actualizar el usuario con ID: ${usuarioId}. Error:`, e.message);
    throw new Error('Error al actualizar el usuario: ' + e.message);
  }
}

const eliminarUsuario = async (usuarioId) => {
  try {
    const conexion = await ObtenerConexion();
    const verificarUsuarioSql = `SELECT COUNT(*) AS count FROM pruebaTecnica.usuarios WHERE usuario_id = $1`;
    const resultadoadoVerificacion = await conexion.query(verificarUsuarioSql, [usuarioId]);
    const contador = parseInt(resultadoadoVerificacion.rows[0].count, 10);
    if (contador === 0) {
      return { error: `Usuario con ID ${usuarioId} no encontrado` };
    }
    const eliminarUsuarioSql = `DELETE FROM pruebaTecnica.usuarios WHERE usuario_id = $1`;
    await conexion.query(eliminarUsuarioSql, [usuarioId]);
    return { status: "OK", message: "Usuario eliminado correctamente" };
  } catch(e) {
    console.error(`No se pudo eliminar el usuario con ID: ${usuarioId}. Error:`, e.message);
    throw new Error('Error al eliminar el usuario: ' + e.message);
  }
  
}

module.exports = {
  registrarUsuario,
  inicioSesion,
  obtenerUsuarios,
  consultarUsuarioPorCorreo,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};