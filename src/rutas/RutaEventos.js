const express = require("express");
const rutas = express.Router();
const eventoController = require('../controladores/ControladorEvento')
const autenticacion = require("../autenticacion/Autenticacion")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * @swagger
 * /api/crear-evento:
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
rutas.post("/crear-evento", autenticacion, eventoController.crearEvento);

/**
 * @swagger
 * /api/obtener-eventos:
 *   get:
 *     summary: Obtener una lista de eventos
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del organizador.
 *                         example: "santiago@gmail.com"
 *                       name:
 *                         type: string
 *                         description: Nombre del evento.
 *                         example: "comedia v2"
 *                       description:
 *                         type: string
 *                         description: Descripción del evento.
 *                         example: "Evento de prueba"
 *                       location:
 *                         type: string
 *                         description: Ubicación del evento.
 *                         example: "calle 52 #9-45, medellin"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Fecha del evento en formato YYYY-MM-DD.
 *                         example: "2024-10-12"
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
 *         description: Error interno del servidor, como fallos al obtener la lista de eventos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener la lista de eventos: Detalle del error interno"
 */
rutas.get("/obtener-eventos", autenticacion, eventoController.obtenerEventos);

/**
 * @swagger
 * /api/obtener-evento-por-id/{eventoId}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a obtener
 *         example: 10
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciUzI1NiIsInR5cCkpXVCJ9..."
 *         description: Token JWT para la autenticación
 *     responses:
 *       200:
 *         description: Evento encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       event_id:
 *                         type: integer
 *                         description: ID del evento
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         description: ID del usuario asociado
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre del evento
 *                         example: "Evento 1"
 *                       description:
 *                         type: string
 *                         description: Descripción del evento
 *                         example: "Prueba de evento 1"
 *                       created_date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación del evento
 *                         example: "2024-10-12T11:32:46.000Z"
 *                       location:
 *                         type: string
 *                         description: Ubicación del evento
 *                         example: "-75.5812,6.2442"
 *                       assistance:
 *                         type: integer
 *                         description: Número de asistentes
 *                         example: 0
 *                       event_date:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha del evento
 *                         example: "2024-10-12T11:32:46.000Z"
 *       400:
 *         description: Error en la validación de parámetros. El ID del evento no es un número entero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "El ID debe ser un número entero"
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
 *       404:
 *         description: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Evento con ID 1 no encontrado"
 *       500:
 *         description: Error interno del servidor. Problemas al obtener el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al obtener el evento: [Descripción del error]"
 */
rutas.get("/obtener-evento-por-id/:eventoId", autenticacion, eventoController.obtenerEvento)

/**
 * @swagger
 * /api/eventos/lugares-cercanos:
 *   post:
 *     summary: Obtiene lugares cercanos basados en longitud, latitud y rango
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lon:
 *                 type: number
 *                 format: float
 *                 example: -75.5812
 *                 description: Longitud de la ubicación. Debe estar entre -180 y 180 grados.
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 6.2442
 *                 description: Latitud de la ubicación. Debe estar entre -90 y 90 grados.
 *               range:
 *                 type: integer
 *                 example: 500
 *                 description: Rango en metros para buscar lugares cercanos. Debe ser un número entero positivo con al menos 3 dígitos.
 *             required:
 *               - longitud
 *               - latitud
 *               - rango
 *     responses:
 *       200:
 *         description: Lista de lugares cercanos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: poi.115949
 *                         description: ID del lugar de interés.
 *                       type:
 *                         type: string
 *                         example: Feature
 *                       place_type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["poi"]
 *                       relevance:
 *                         type: number
 *                         example: 1
 *                       properties:
 *                         type: object
 *                         properties:
 *                           foursquare:
 *                             type: string
 *                             example: 59d1f06f9c4c2f3
 *                           landmark:
 *                             type: boolean
 *                             example: true
 *                           category:
 *                             type: string
 *                             example: mall, la central, centro comercial
 *                           maki:
 *                             type: string
 *                             example: mall
 *                       text:
 *                         type: string
 *                         example: la central
 *                       place_name:
 *                         type: string
 *                         example: la central, Medellin, Colombia
 *                       center:
 *                         type: array
 *                         items:
 *                           type: number
 *                         example: [-75.5812, 6.2442]
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: Point
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             example: [-75.5812, 6.2442]
 *                       context:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             mapbox_id:
 *                               type: string
 *                             text:
 *                               type: string
 *                             wikidata:
 *                               type: string
 *                             short_code:
 *                               type: string
 *       400:
 *         description: Solicitud inválida debido a parámetros incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La longitud debe estar entre -180 y 180 grados"
 *       401:
 *         description: No autorizado. Token de autenticación no proporcionado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token de autenticación no válido."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al procesar la solicitud."
 */
rutas.post("/lugares-cercanos", autenticacion, eventoController.ubicacionesCercanas)

module.exports = rutas;