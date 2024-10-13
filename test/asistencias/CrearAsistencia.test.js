const { registrarAsistencia } = require('../../src/repositorios/AsistenciaRepositorio'); 
const obtenerEventoServicio = require('../../src/servicio/eventos/ObtenerEventoServicio'); 
const actualizarEventoServicio = require('../../src/servicio/eventos/ActualizarEventoServicio'); 
const { ObtenerConexion } = require('../../src/utilidades/database/postgres'); 

jest.mock('../../src/servicio/eventos/ObtenerEventoServicio');
jest.mock('../../src/servicio/eventos/ActualizarEventoServicio');
jest.mock('../../src/utilidades/database/postgres');

describe('Registrar Asistencia', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('debería registrar la asistencia exitosamente', async () => {
        // Mock del evento
        const mockEvento = {
            evento_id: 1,
            usuario_id: 2,
            nombre: "Evento Test",
            descripcion: "Descripción del evento",
            fecha_creacion: new Date(),
            locacion: "Ubicación",
            asistencia: 5,
            fecha_evento: new Date(),
        };

        // Mock de los servicios
        obtenerEventoServicio.obtenerEventoPorId.mockResolvedValue(mockEvento);
        actualizarEventoServicio.ejecutar.mockResolvedValue(); // Suponiendo que no devuelve nada
        ObtenerConexion.mockResolvedValue({
            query: jest.fn().mockResolvedValue({ rows: [{ evento_id: 1, usuario_id: 2, fecha: new Date() }] }),
        });

        const asistencia = {
            eventoId: 1,
            usuarioId: 2,
            fecha: new Date(),
        };

        const resultado = await registrarAsistencia(asistencia);
        
        expect(resultado).toEqual([{ evento_id: 1, usuario_id: 2, fecha: expect.any(Date) }]);
        expect(obtenerEventoServicio.obtenerEventoPorId).toHaveBeenCalledWith(asistencia.eventoId);
        expect(actualizarEventoServicio.ejecutar).toHaveBeenCalled();
    });

    it('debería manejar el caso cuando el evento no existe', async () => {
        obtenerEventoServicio.obtenerEventoPorId.mockResolvedValue(null);

        const asistencia = {
            eventoId: 1,
            usuarioId: 2,
            fecha: new Date(),
        };

        const resultado = await registrarAsistencia(asistencia);
        
        expect(resultado).toEqual({ success: false, message: "El evento no existe, no se puede registrar la asistencia." });
        expect(obtenerEventoServicio.obtenerEventoPorId).toHaveBeenCalledWith(asistencia.eventoId);
    });

    it('debería lanzar un error si ocurre un fallo en la conexión', async () => {
        obtenerEventoServicio.obtenerEventoPorId.mockRejectedValue(new Error('Fallo la conexion'));

        const asistencia = {
            eventoId: 1,
            usuarioId: 2,
            fecha: new Date(),
        };

        await expect(registrarAsistencia(asistencia)).rejects.toThrow('Error al registrar la asistencia: Fallo la conexion');
    });
});
