const { eliminarUsuario } = require('../../src/repositorios/UsuarioRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');

jest.mock('../../src/utilidades/database/postgres');


describe('EliminarUsuario', () => {

    let mockQuery;

    beforeEach(() => {
        mockQuery = jest.fn();
        const mockConnection = { query: mockQuery };
        ObtenerConexion.mockResolvedValue(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('deberia eliminar los usuarios de la base de datos', async () => {
        const usuarioId = 1;

        await eliminarUsuario(usuarioId);

        expect(ObtenerConexion).toHaveBeenCalled();

        expect(mockQuery).toHaveBeenCalledWith(
            "DELETE FROM pruebaTecnica.usuarios WHERE usuario_id = $1",
            [usuarioId]
        );
    });

    it('deberia lanzar error si falla conexion', async () => {
        ObtenerConexion.mockRejectedValue(new Error('Fallo la conexion'));
        const usuarioId = 1;
        await expect(eliminarUsuario(usuarioId)).rejects.toThrow('Error al eliminar el usuario: Fallo la conexion');
    });
});
