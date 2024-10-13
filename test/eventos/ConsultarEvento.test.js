
const { obtenerEventoPorId, obtenerEventos } = require('../../src/repositorios/EventoRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');


jest.mock('../../src/utilidades/database/postgres'); 

describe('ObtenerEventos', () => {
    it('deberia traer todos los eventos de la base de datos', async () => {
      const mockEventos = [{ evento_id: 3,
            usuario_id: 13,
            nombre: "Opera",
            descripcion: "Evento de opera",
            creado_por: "2024-10-13T02:58:08.210Z",
            locacion: "-75.544188,6.238315",
            asistencia: 0,
            fecha_evento: "2024-10-12T05:00:00.000Z" 
        }, 
        { evento_id: 4,
            usuario_id: 13,
            nombre: "Opera",
            descripcion: "Evento de opera",
            creado_por: "2024-10-13T02:58:08.210Z",
            locacion: "-75.544188,6.238315",
            asistencia: 0,
            fecha_evento: "2024-10-12T05:00:00.000Z"
         }];
      const mockQuery = jest.fn().mockResolvedValue({ rows: mockEventos });
      const mockConnection = { query: mockQuery };

      ObtenerConexion.mockResolvedValue(mockConnection);
      const eventos = await obtenerEventos();
      expect(ObtenerConexion).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.eventos");
      expect(eventos).toEqual(mockEventos);
    });
  
    it('deberia lanzar errores', async () => {
      ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
  
      await expect(obtenerEventos()).rejects.toThrow('Error al obtener el evento: Fallo la conexion');
    });
  });
  


  describe('ObtenerEventoPorId', () => {
    it('deberia traer el evento de la base de datos', async () => {
      const mockEventoId = 1; 
      const mockQuery = jest.fn().mockResolvedValue({ rows: [{ id: mockEventoId }] });
      const mockConnection = { query: mockQuery };
  
      
      ObtenerConexion.mockResolvedValue(mockConnection);
  
      const evento = await obtenerEventoPorId(mockEventoId);
  
      expect(ObtenerConexion).toHaveBeenCalled();
  
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM pruebaTecnica.eventos WHERE evento_id = $1", [mockEventoId]);
        
      expect(evento).toEqual([{ id: mockEventoId }]);
    });
  
    it('deberia lanzar errores', async () => {
      // Simulamos que getConnection lanza un error
      ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
      const mockEventoId = 1;
      await expect(obtenerEventoPorId(mockEventoId)).rejects.toThrow('Error al obtener el evento: Fallo la conexion');
    });
  });
