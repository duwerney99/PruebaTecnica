const { registrarUsuario } = require('../../src/repositorios/UsuarioRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');
const encrypt = require("../../src/utilidades/CifrarContrasena");

jest.mock('../../src/utilidades/database/postgres');

describe('RegistrarUsuario', () => {
  it('Debería insertar un usuario', async () => {

    const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, nombre: 'Santiago', correo: 'santiago@gmail.com' }] });
    const mockConnection = { query: mockQuery };

    ObtenerConexion.mockResolvedValue(mockConnection);

    const nuevoUsuario = { correo: 'santiago@gmail.com', contrasena: '12345', nombre: 'Santiago', fecha_registro: '10/11/2024' };

    const constrasenaEncriptada = await encrypt.encrypt(nuevoUsuario.contrasena);
    nuevoUsuario.contrasena = constrasenaEncriptada;
    const fecha_registro = '10/11/2024';

    const resultado = await registrarUsuario(fecha_registro, constrasenaEncriptada, nuevoUsuario);

    expect(ObtenerConexion).toHaveBeenCalled();

    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO pruebaTecnica.usuarios (correo, contrasena, nombre, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        'santiago@gmail.com',
        expect.any(String),
        'Santiago',
        expect.anything()
      ]
    );

    expect(resultado).toEqual({ id: 1, correo: 'santiago@gmail.com', nombre: 'Santiago' });
  });

  it('debe gestionar los errores durante el registro del usuario', async () => {
    ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
    const nuevoUsuario = { correo: 'santiago@gmail.com', contrasena: '12345', nombre: 'Santiago' };

    const constrasenaEncriptada = await encrypt.encrypt(nuevoUsuario.contrasena);
    nuevoUsuario.contrasena = constrasenaEncriptada;
    const fecha_registro = '10/11/2024';

    await expect(registrarUsuario(fecha_registro, constrasenaEncriptada, nuevoUsuario)).rejects.toThrow('Fallo la conexion');
  });
});
