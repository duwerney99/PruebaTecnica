
const { obtenerUsuarios, obtenerUsuarioPorId } = require('../../src/repositorios/UsuarioRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres'); 

jest.mock('../../src/utilidades/database/postgres'); 


describe('ConsultarUsuario', () => {
  it('deberia retornar los usuarios de la base de datos', async () => {
    const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Santiago' }] });
    const mockConnection = { query: mockQuery };

    ObtenerConexion.mockResolvedValue(mockConnection);

    const users = await obtenerUsuarios();

    expect(ObtenerConexion).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.usuarios");

    expect(users).toEqual([{ id: 1, name: 'Santiago' }]);
  });

  it('deberia retornar errores', async () => {
    ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));

    await expect(obtenerUsuarios()).rejects.toThrow('Fallo la conexion');
  });
});



describe('ConsultarUsuarioPorId', () => {
  it('deberia retornar el usuario de la base de datos', async () => {
    const usuarioId = 1;
    const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Santiago' }] });
    const mockConnection = { query: mockQuery };
    ObtenerConexion.mockResolvedValue(mockConnection);
    const usuario = await obtenerUsuarioPorId(usuarioId);
    expect(ObtenerConexion).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.usuarios WHERE usuario_id = $1", [usuarioId] );
    expect(usuario).toEqual([{ id: 1, name: 'Santiago' }]);
  });

  it('should handle errors', async () => {
    ObtenerConexion.mockRejectedValue(new Error('No se pudo obtener el usuario con ID: ${usuarioId}. Error:'));
    const usuarioId = 1;
    await expect(obtenerUsuarioPorId(usuarioId)).rejects.toThrow('Error al obtener el usuario: ');
  });
});