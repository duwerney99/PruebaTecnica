const express = require("express");
const rutas = express.Router();
const controladorAsistencia = require('../controladores/ControladorAsistencia')
const autenticacion = require("../autenticacion/Autenticacion")
const {
    validarRegistroAsistente,
    validarAsitenteId,
    validarObtenerAsistentesPorEvento,
    validarObtenerAsistentesPorUsuario,
    validarActualizacionAsistente
} = require('../utilidades/validaciones/ValidacionesAsistencia')

/**
 * @swagger
 * /api/registrar-asistencia:
 *   post:
 *     summary: Registrar un asistente a un evento
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: integer
 *                 description: ID del evento al que el usuario asistirá
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 description: ID del usuario que asistirá al evento
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: fecha
 *                 description: Fecha de la asistencia (formato YYYY-MM-DD)
 *                 example: "2024-10-12"
 *     responses:
 *       200:
 *         description: Asistencia registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Asistencia registrada exitosamente Asistencia:"
 *                     data:
 *                       type: object
 *                       properties:
 *                         eventoId:
 *                           type: integer
 *                           description: ID del evento
 *                           example: 3
 *                         usuarioId:
 *                           type: integer
 *                           description: ID del usuario
 *                           example: 3
 *                         fecha:
 *                           type: string
 *                           format: fecha
 *                           description: Fecha de la asistencia
 *                           example: "2024-10-12"
 *       400:
 *         description: Error en la validación de los parámetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error
 *                         example: "El ID del evento debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: El evento no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Mensaje de error indicando que el evento no existe
 *                       example: "El evento no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al registrar la asistencia"
 */
rutas.post("/registrar-asistencia", validarRegistroAsistente,autenticacion, controladorAsistencia.crearAsistencia);

/**
 * @swagger
 * /api/obtener-asistentes:
 *   get:
 *     summary: Obtener un listado de todos los asistentes registrados
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Listado de asistentes recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       evento_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       usuario_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       fecha:
 *                         type: string
 *                         format: fecha-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-10-12T05:00:00.000Z"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes"
 */
rutas.get("/obtener-asistencias", autenticacion, controladorAsistencia.obtenerAsistencias);

/**
 * @swagger
 * /api/asistencia-dia-dia:
 *   get:
 *     summary: Obtener el número de asistentes por cada día de la semana
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Asistencia diaria recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     Domingo:
 *                       type: integer
 *                       description: Número de asistencias registradas el domingo
 *                       example: 1
 *                     Lunes:
 *                       type: integer
 *                       description: Número de asistencias registradas el lunes
 *                       example: 0
 *                     Martes:
 *                       type: integer
 *                       description: Número de asistencias registradas el martes
 *                       example: 0
 *                     Miércoles:
 *                       type: integer
 *                       description: Número de asistencias registradas el miércoles
 *                       example: 0
 *                     Jueves:
 *                       type: integer
 *                       description: Número de asistencias registradas el jueves
 *                       example: 0
 *                     Viernes:
 *                       type: integer
 *                       description: Número de asistencias registradas el viernes
 *                       example: 0
 *                     Sábado:
 *                       type: integer
 *                       description: Número de asistencias registradas el sábado
 *                       example: 0
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener la asistencia diaria"
 */
rutas.get("/asistencia-dia-dia", autenticacion, controladorAsistencia.obtenerAsistenciaDias);

/**
 * @swagger
 * /api/obtener-asistente-id:
 *   get:
 *     summary: Obtener la información de un asistente por ID
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         nombre: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 20
 *         description: ID del asistente a buscar
 *     responses:
 *       200:
 *         description: Asistente encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 2
 *                       evento_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       usuario_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       fecha:
 *                         type: string
 *                         format: fecha-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-10-12T12:00:00.000Z"
 *       400:
 *         description: Error en la validación de los parámetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error
 *                         example: "El ID del asistente debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         description: Asistente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Asistente no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener el asistente"
 */
rutas.get("/obtener-asistente-id/:asistenciaId", validarAsitenteId,  autenticacion, controladorAsistencia.obtenerAsistencia);

/**
 * @swagger
 * /api/obtener-asistentes-registrados-usuario:
 *   get:
 *     summary: Obtener los asistentes registrados por usuario
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         nombre: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *         description: ID del usuario para obtener los asistentes
 *     responses:
 *       200:
 *         description: Lista de asistentes encontrados para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       evento_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       usuario_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       fecha:
 *                         type: string
 *                         format: fecha-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-10-13T00:00:00.000Z"
 *       400:
 *         description: Error en la validación de los parámetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error
 *                         example: "El ID del usuario debe ser un número entero positivo"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes del usuario"
 */
rutas.get("/obtener-asistentes-registrados-usuario/:usuarioId", validarObtenerAsistentesPorUsuario,  autenticacion, controladorAsistencia.obtenerAsistenciasPorUsuario);

/**
 * @swagger
 * /api/obtener-asistencia-evento:
 *   get:
 *     summary: Obtener asistentes para un evento específico
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         description: ID del evento para obtener los asistentes
 *         schema:
 *           type: integer
 *           example: 22
 *     responses:
 *       200:
 *         description: Lista de asistentes para el evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assistance_id:
 *                         type: integer
 *                         description: ID de la asistencia
 *                         example: 20
 *                       evento_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       usuario_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       fecha:
 *                         type: string
 *                         format: fecha-time
 *                         description: Fecha de la asistencia
 *                         example: "2024-10-12T01:00:00.000Z"
 *       400:
 *         description: Error en la validación del ID del evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error
 *                         example: "El ID del evento debe ser un número entero positivo"
 *       404:
 *         description: No se encontraron asistentes para el evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "No se encontraron asistentes para este evento"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error al obtener los asistentes para el evento"
 */
rutas.get("/obtener-asistencia-evento/:eventoId", validarObtenerAsistentesPorEvento, autenticacion, controladorAsistencia.obtenerAsistenciaPorEvento)

/**
 * @swagger
 * /api/actualizar-asistencia:
 *   put:
 *     summary: Actualizar información de un asistente
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del asistente a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: integer
 *                 description: ID del evento asociado al asistente.
 *                 example: 62
 *               usuarioId:
 *                 type: integer
 *                 description: ID del usuario que asistió al evento.
 *                 example: 2
 *               fecha:
 *                 type: string
 *                 format: fecha
 *                 description: Fecha de la asistencia en formato YYYY-MM-DD.
 *                 example: "2024-10-12"
 *     responses:
 *       200:
 *         description: Asistencia actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: OK
 *                     message:
 *                       type: string
 *                       example: Asistencia actualizada exitosamente
 *                     data:
 *                       type: object
 *                       properties:
 *                         evento_id:
 *                           type: integer
 *                           example: 62
 *                         usuario_id:
 *                           type: integer
 *                           example: 2
 *                         fecha:
 *                           type: string
 *                           format: fecha
 *                           example: "2024-10-12 00:00:00"
 *       400:
 *         description: Error en la validación de los parámetros. Puede ser que alguno de los IDs no sea un número entero positivo o que la fecha no sea válida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Mensaje de error sobre la validación
 *                         example: El ID del asistente debe ser un número entero positivo
 *       404:
 *         description: Asistente no encontrado o no actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *                   example: Asistente no encontrado o no actualizado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *                   example: Error interno del servidor
 */
rutas.put("/actualizar-asistencia/:asistenciaId", validarActualizacionAsistente, autenticacion, controladorAsistencia.actualizarAsistencia);


/**
 * @swagger
 * /api/eliminar-asistencia/{asistenciaId}:
 *   delete:
 *     summary: Eliminar un asistente
 *     tags: [Asistentes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: asistenteId
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del asistente que se desea eliminar
 *           example: 1
 *     responses:
 *       200:
 *         description: Asistente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Asistencia eliminada exitosamente"
 *       404:
 *         description: El asistente no fue encontrado o no pudo ser eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Asistente no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje del error
 *                   example: "Error interno del servidor"
 */
rutas.delete("/eliminar-asistencia/:asistenciaId", autenticacion, controladorAsistencia.eliminarAsistencia);





module.exports = rutas;