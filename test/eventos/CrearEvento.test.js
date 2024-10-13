const { crearEvento } = require('../../src/repositorios/EventoRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');


jest.mock('../../src/utilidades/database/postgres');
 

describe('RegistrarEvento', () => {
    it('Debería registrar un evento', async () => {
  
      const mockQuery = jest.fn().mockResolvedValue({ rows: {  usuario_id: 1, nombre: 'Santiago', descripcion:'Comicon', creado_por: '10/11/2024', locacion: 'calle 52 #19-34, medellin', asistencia: 0, fecha_evento: '10/11/2024'  } });
      const mockConnection = { query: mockQuery };
  
      ObtenerConexion.mockResolvedValue(mockConnection);
  
      const nuevoEvento = { evento_id:1, usuario_id: 1, nombre: 'Santiago', descripcion:'Comicon', creado_por: '10/11/2024', locacion: 'calle 52 #19-34, medellin', asistencia: 0, fecha_evento: '10/11/2024' };
      const resultado = await crearEvento(nuevoEvento);
  
      expect(ObtenerConexion).toHaveBeenCalled();
  
      expect(mockQuery).toHaveBeenCalledWith(
        "INSERT INTO pruebaTecnica.eventos (usuario_id, nombre, descripcion, creado_por, locacion, asistencia, fecha_evento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
         [1, "Santiago", "Comicon", "10/11/2024", "calle 52 #19-34, medellin", 0, "10/11/2024"]
      );
      expect(resultado).toEqual({ usuario_id: 1, nombre: 'Santiago', descripcion:'Comicon', creado_por: '10/11/2024', locacion: 'calle 52 #19-34, medellin', asistencia: 0, fecha_evento: '10/11/2024' });
    });
  
    it('debe gestionar los errores durante el registro del evento', async () => {
      ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
      const nuevoEvento = { evento_id:1, usuario_id: 1, nombre: 'Santiago', descripcion:'Comicon', creado_por: '10/11/2024', locacion: 'calle 52 #19-34, medellin', asistencia: 0, fecha_evento: '10/11/2024' };
  
      await expect(crearEvento(nuevoEvento)).rejects.toThrow('Error al registrar el evento: Fallo la conexion');
    });
  });
  