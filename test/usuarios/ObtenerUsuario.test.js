const { obtenerUsuarios, obtenerUsuarioPorId } = require('../../src/repositorios/UsuarioRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');



jest.mock('../../src/utilidades/database/postgres');


describe('ObtenerUsuarios', () => {
    it('deberia traer todos los usuarios de la base de datos', async () => {
      const mockUsuarios = [{ id: 1, nombre: 'Santiago' }, { id: 2, nombre: 'Duwer' }];
      const mockQuery = jest.fn().mockResolvedValue({ rows: mockUsuarios });
      const mockConnection = { query: mockQuery };

      ObtenerConexion.mockResolvedValue(mockConnection);
      const usuarios = await obtenerUsuarios();
      expect(ObtenerConexion).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.usuarios");
      expect(usuarios).toEqual(mockUsuarios);
    });
  
    it('deberia lanzar errores', async () => {
      ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
  
      await expect(obtenerUsuarios()).rejects.toThrow('Error al obtener los usuarios: Fallo la conexion');
    });
  });
  




  describe('ObtenerUsuarioPorId', () => {
    it('deberia traer el usuario de la base de datos', async () => {
      const mockUsuarioId = 1; 
      const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: mockUsuarioId }] });
      const mockConnection = { query: mockQuery };
  
      
      ObtenerConexion.mockResolvedValue(mockConnection);
  
      const usuario = await obtenerUsuarioPorId(mockUsuarioId);
  
      expect(ObtenerConexion).toHaveBeenCalled();
  
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.usuarios WHERE usuario_id = $1", [mockUsuarioId]);
        
      expect(usuario).toEqual([{ id: mockUsuarioId }]);
    });
  
    it('deberia lanzar errores', async () => {
      // Simulamos que getConnection lanza un error
      ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
      const mockUsuarioId = 1;
      await expect(obtenerUsuarioPorId(mockUsuarioId)).rejects.toThrow('Error al obtener el usuario: Fallo la conexion');
    });
  });
