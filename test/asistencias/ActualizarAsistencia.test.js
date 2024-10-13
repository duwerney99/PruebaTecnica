const {  } = require('../../src/repositorios/AsistenciaRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');

jest.mock('../../src/utilidades/database/postgres');

describe('ActualizarUsuario', () => {
    let mockQuery;

    mockQuery = jest.fn();
    ObtenerConexion.mockResolvedValue({ query: mockQuery });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería actualizar el evento correctamente', async () => {
        const evento = {
            nombre: "Tecnologia",
            descripcion: "Evento actualizado de prueba",
            locacion: "-73.117983,7.111394",
            fecha_evento: "2024-10-12",
            usuarioId: 1,
            asistencia: 0,
            eventoId: 2
        };
        await actulizarEvento(evento);

        expect(mockQuery).toHaveBeenCalledWith(
            'UPDATE pruebaTecnica.eventos SET nombre = $1, descripcion = $2, creado_por = $3, locacion = $4, asistencia = $5, fecha_evento = $6 WHERE evento_id = $7',
            ['Tecnologia', 'Evento actualizado de prueba', expect.any(Date), "-73.117983,7.111394", 0, "2024-10-12", 2]
        );
    });
});
