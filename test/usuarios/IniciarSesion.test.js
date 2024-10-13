const jwt = require('jsonwebtoken');
const InicioSesionServicio  = require('../../src/servicio/inicio-sesion/InicioSesionServicio');

jest.mock('jsonwebtoken');

describe('InicioSesion', () => {
  it('debería devolver un accessToken y refreshToken', async () => {
    jwt.sign
      .mockReturnValueOnce('mockAccessToken')  
      .mockReturnValueOnce('mockRefreshToken'); 
    const usuario = { nombre: 'Santiago', contrasena: '12345' };
    const resultado = await InicioSesionServicio.generarToken(usuario);
    
    expect(jwt.sign).toHaveBeenCalledTimes(2);

    expect(jwt.sign).toHaveBeenCalledWith(
      { nombre: 'Santiago', id: '12345' },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    expect(jwt.sign).toHaveBeenCalledWith(
      { nombre: 'Santiago', id: '12345' },
      process.env.REFRESH_TOKEN_SECRET
    );
    
    expect(resultado).toEqual({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    });
  });
});
