const { ObtenerConexion } = require("../../utilidades/database/postgres");
const obtenerUsuarioServicio = require('../../servicio/usuarios/ObtenerUsuarioServicio');
const { obtenerCoordenadas } = require('../../utilidades/ObtenerCoordenads');
const ExcelJS = require('exceljs');

class CargueMasivoEventos {
    static async ejecutar(file) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.worksheets[0];

        let errores = []; 
        const rows = worksheet.getRows(2, worksheet.rowCount - 1); 

        await Promise.all(rows.map(async (row) => {
            const [correo, nombre, descripcion, locacion, fecha_evento] = row.values.filter(val => val !== undefined && val !== '');

            if (!correo) {
                return;
            }
            const usuario = await obtenerUsuarioServicio.obtenerUsuarioPorCorreo(correo);
            if (!usuario.correo) {
                console.warn(`No se encontró usuario con el correo ${correo}`);
                errores.push(usuario.message);
                return;
            }
            const coordenates = await obtenerCoordenadas(locacion);
            
            const eventToRegister = {
                usuario_id: usuario.usuarioId,
                nombre,
                descripcion,
                created_por: new Date(),
                locacion: `${coordenates[0]},${coordenates[1]}`,
                asistencia: 0,
                fecha_evento
            };
            
            const conexion = await ObtenerConexion();
            const sql = `
                INSERT INTO pruebaTecnica.eventos (usuario_id, nombre, descripcion, creado_por, locacion, asistencia, fecha_evento)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
            const values = [
                eventToRegister.usuario_id,
                eventToRegister.nombre,
                eventToRegister.descripcion,
                eventToRegister.created_por,
                eventToRegister.locacion,
                eventToRegister.asistencia,
                eventToRegister.fecha_evento
            ];
            
            try {
                await conexion.query(sql, values);
            } catch (error) {
                console.error(`Error al insertar evento: ${error.message}`);
                errores.push(`Error al insertar evento para ${correo}: ${error.message}`);
            }
        }));
        return errores; 
    }
}

module.exports = CargueMasivoEventos;
