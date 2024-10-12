const express = require("express");
const rutas = express.Router();
const eventoController = require('../controladores/ControladorEvento')
const autenticacion = require("../autenticacion/Autenticacion")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * @swagger
 * /api:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del organizador.
 *                 example: "santiago@gmail.com"
 *               name:
 *                 type: string
 *                 description: Nombre del evento.
 *                 example: "evento v2"
 *               description:
 *                 type: string
 *                 description: Descripción del evento.
 *                 example: "Evento de prueba"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento.
 *                 example: "calle 52 #9-45, medellin"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del evento en formato YYYY-MM-DD.
 *                 example: "2024-10-12"
 *           required:
 *             - email
 *             - name
 *             - description
 *             - location
 *             - date
 *     responses:
 *       200:
 *         description: Evento creado exitosamente
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
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del organizador.
 *                       example: "santiago@gmail.com"
 *                     name:
 *                       type: string
 *                       description: Nombre del evento.
 *                       example: "evento v2"
 *                     description:
 *                       type: string
 *                       description: Descripción del evento.
 *                       example: "Evento de prueba"
 *                     location:
 *                       type: string
 *                       description: Ubicación del evento.
 *                       example: "calle 52 #9-45, medellin"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Fecha del evento en formato YYYY-MM-DD.
 *                       example: "2024-10-12"
 *       400:
 *         description: Error en los datos de entrada. Por ejemplo, el email no es válido o falta información requerida.
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
 *                         description: Mensaje de error correspondiente a la validación fallida
 *                         example: "Debe ser un correo electrónico válido"
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         example: "correo"
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en el cuerpo de la solicitud)
 *                         example: "body"
 *       401:
 *         description: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         description: Error interno del servidor, como fallos al crear el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al crear el evento: Detalle del error interno"
 */
rutas.post("/crear-evento", autenticacion, eventoController.crearEvento)


module.exports = rutas;