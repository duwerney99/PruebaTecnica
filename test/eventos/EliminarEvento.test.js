const { eliminar } = require('../../src/repositorios/EventoRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');

jest.mock('../../src/utilidades/database/postgres');


describe('EliminarEvento', () => {

    let mockQuery;

    beforeEach(() => {
        mockQuery = jest.fn();
        const mockConnection = { query: mockQuery };
        ObtenerConexion.mockResolvedValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('deberia eliminar los eventos de la base de datos', async () => {
        const eventoId = 1;

        await eliminar(eventoId);

        expect(ObtenerConexion).toHaveBeenCalled();

        expect(mockQuery).toHaveBeenCalledWith(
            "DELETE FROM pruebaTecnica.eventos WHERE evento_id = $1",
            [eventoId]
        );
    });

    it('deberia lanzar error si falla conexion', async () => {
        ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
        const eventoId = 1;
        await expect(eliminar(eventoId)).rejects.toThrow('Error al eliminar el evento: Fallo la conexion');
    });
});
