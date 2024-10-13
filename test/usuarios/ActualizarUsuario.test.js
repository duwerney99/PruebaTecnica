const { actualizarUsuario } = require('../../src/repositorios/UsuarioRepositorio');
const { ObtenerConexion } = require('../../src/utilidades/database/postgres');
const encrypt = require("../../src/utilidades/CifrarContrasena");

jest.mock('../../src/utilidades/database/postgres');
jest.mock('../../src/utilidades/CifrarContrasena'); 


describe('ActualizarUsuario', () => {
    let mockQuery;
    beforeEach(() => {
        mockQuery = jest.fn();
        ObtenerConexion.mockResolvedValue({ query: mockQuery });
        encrypt.encrypt.mockResolvedValue('hashedPassword'); 
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería actualizar el usuario correctamente', async () => {
        const usuario = { id: 1, nombre: 'Santiago', contrasena: '12345' };
        await actualizarUsuario(usuario);
        expect(encrypt.encrypt).toHaveBeenCalledWith(usuario.contrasena);

        expect(mockQuery).toHaveBeenCalledWith(
            'UPDATE pruebaTecnica.usuarios SET contrasena = $1, nombre = $2, fecha_registro = $3 WHERE usuario_id = $4',
            ['hashedPassword', 'Santiago', expect.any(Date), 1]
        );
    });
});
