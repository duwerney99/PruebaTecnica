const express = require("express");
const rutas = express.Router();
const controladorAsistencia = require('../controladores/ControladorAsistencia')
const autenticacion = require("../autenticacion/Autenticacion")


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

rutas.post("/registrar-asistencia", autenticacion, controladorAsistencia.crearAsistencia);

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
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 22
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
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


module.exports = rutas;