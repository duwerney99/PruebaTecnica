const { ObtenerConexion } = require('../utilidades/database/postgres');
const jwt = require("jsonwebtoken");
const encrypt = require("../utilidades/CifrarContrasena");

class UsuarioRepositorio {
  static async registrarUsuario(fecha, constrasenaEncriptada, usuario) {
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

  static async consultarUsuarioPorCorreo(correo) {
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

  static async obtenerUsuarios() {
    try {
      const conexion = await ObtenerConexion();
      const resultado = await conexion.query("SELECT * FROM pruebaTecnica.usuarios");
      return resultado.rows;
    } catch (e) {
      console.error(`No se pudo obtener los usuarios, Error:`, e.message);
      throw new Error('Error al obtener los usuarios: ' + e.message);
    }
  };

  static async obtenerUsuarioPorId(usuarioId) {
    try {
      const conexion = await ObtenerConexion();
      const resultado = await conexion.query("SELECT * FROM pruebaTecnica.usuarios WHERE usuario_id = $1", [usuarioId]);
      return resultado.rows;
    } catch (e) {
      console.error(`No se pudo obtener el usuario con ID: ${usuarioId}. Error:`, e.message);
      throw new Error('Error al obtener el usuario: ' + e.message);
    }

  };

  static async obtenerUsuarioPorCorreo(correo) {
    try {
      if (!correo) {
        console.error("El correo está vacío o indefinido:", correo);
        throw new Error('El correo proporcionado no es válido.');
      }
      const conexion = await ObtenerConexion();
      const resultado = await conexion.query("SELECT * FROM pruebaTecnica.usuarios WHERE correo = $1", [correo]);
      if (resultado.rows.length === 0) {
        return { success: false, message: `usuario con correo ${correo} no encontrado` };
      }

      return {
        success: true,
        usuarioId: resultado.rows[0].usuario_id,
        correo: resultado.rows[0].correo,
      };
    } catch (e) {
      console.error(`No se pudo obtener el usuario con correo: ${correo}. Error:`, e.message);
      throw new Error('Error al obtener el usuario: ' + e.message);
    }
  };


  static async actualizarUsuario(usuario) {
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
        usuario.id
      ]);
    } catch (e) {
      console.error(`No se pudo actualizar el usuario con ID: ${usuario.id}. Error:`, e.message);
      throw new Error('Error al actualizar el usuario: ' + e.message);
    }
  }

  static async eliminarUsuario(usuarioId) {
    try {
      const conexion = await ObtenerConexion();
      const eliminarUsuarioSql = `DELETE FROM pruebaTecnica.usuarios WHERE usuario_id = $1`;
      await conexion.query(eliminarUsuarioSql, [usuarioId]);
    } catch (e) {
      console.error(`No se pudo eliminar el usuario con ID: ${usuarioId}. Error:`, e.message);
      throw new Error('Error al eliminar el usuario: ' + e.message);
    }

  }
}

module.exports = UsuarioRepositorio;