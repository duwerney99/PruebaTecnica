const jwt = require('jsonwebtoken');

class InicioSesionServicio {
    static async generarToken(usuario) {
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
}

module.exports = InicioSesionServicio;