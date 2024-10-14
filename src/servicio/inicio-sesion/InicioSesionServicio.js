const jwt = require('jsonwebtoken');

class InicioSesionServicio {
    static async generarToken(usuario) {
        const { nombre, contrasena } = usuario;
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new Error('Las claves secretas no están definidas.');
        }

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
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return { accessToken, refreshToken };
    };
}

module.exports = InicioSesionServicio;
