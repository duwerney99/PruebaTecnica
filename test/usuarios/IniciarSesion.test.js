const jwt = require('jsonwebtoken');
const { inicioSesion } = require('../../src/repositorios/UsuarioRepositorio');

jest.mock('jsonwebtoken');

describe('InicioSesion', () => {
  it('debería devolver un accessToken y refreshToken', async () => {
    
    // Simulamos que los tokens se generan correctamente
    jwt.sign
      .mockReturnValueOnce('mockAccessToken')  // Primero para el accessToken
      .mockReturnValueOnce('mockRefreshToken'); // Luego para el refreshToken
    
    const user = { nombre: 'Santiago', contrasena: '12345' };

    const resultado = await inicioSesion(user);

    // Verificar que jwt.sign se haya llamado dos veces para generar los tokens
    expect(jwt.sign).toHaveBeenCalledTimes(2);
    
    // Verificar que el resultado devuelto sea el esperado
    expect(resultado).toEqual({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    });
  });
});
