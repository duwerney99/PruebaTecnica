// getUsers.test.js
const { obtenerUsuarios } = require('../../src/repositorios/UsuarioRepositorio');
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


//GetUser



// describe('GetUser', () => {
//   it('should return user by id from the database', async () => {

//     const id = 1;


//     // Mock de la conexión y el query
//     const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: 1, name: 'Santiago' }] });
//     const mockConnection = { query: mockQuery };

//     // Simulamos que getConnection retorna la conexión mockeada
//     getConnection.mockResolvedValue(mockConnection);

//     // Ejecutamos la función
//     const user = await GetUser(id);

//     // Verificamos que getConnection fue llamado
//     expect(getConnection).toHaveBeenCalled();

//     // Verificamos que la consulta SQL fue llamada correctamente
//     expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tecniTest.users WHERE user_id = $1", [id] );

//     // Verificamos que el resultado de la función sea el esperado
//     expect(user).toEqual([{ id: 1, name: 'Santiago' }]);
//   });

//   it('should handle errors', async () => {
//     // Simulamos que getConnection lanza un error
//     getConnection.mockRejectedValue(new Error('Connection failed'));

//     await expect(GetUsers()).rejects.toThrow('Connection failed');
//   });
// });