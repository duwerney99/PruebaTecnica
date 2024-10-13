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
 *               correo:
 *                 type: string
 *                 descripcion: Correo electrónico del organizador.
 *                 example: "santiago@gmail.com"
 *               nombre:
 *                 type: string
 *                 descripcion: Nombre del evento.
 *                 example: "evento v2"
 *               descripcion:
 *                 type: string
 *                 descripcion: Descripción del evento.
 *                 example: "Evento de prueba"
 *               locacion:
 *                 type: string
 *                 descripcion: Ubicación del evento.
 *                 example: "calle 52 #9-45, medellin"
 *               fecha:
 *                 type: string
 *                 format: fecha
 *                 descripcion: Fecha del evento en formato YYYY-MM-DD.
 *                 example: "2024-10-12"
 *           required:
 *             - correo
 *             - nombre
 *             - descripcion
 *             - locacion
 *             - fecha
 *     responses:
 *       200:
 *         descripcion: Evento creado exitosamente
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
 *                     correo:
 *                       type: string
 *                       descripcion: Correo electrónico del organizador.
 *                       example: "santiago@gmail.com"
 *                     nombre:
 *                       type: string
 *                       descripcion: Nombre del evento.
 *                       example: "evento v2"
 *                     descripcion:
 *                       type: string
 *                       descripcion: Descripción del evento.
 *                       example: "Evento de prueba"
 *                     locacion:
 *                       type: string
 *                       descripcion: Ubicación del evento.
 *                       example: "calle 52 #9-45, medellin"
 *                     fecha:
 *                       type: string
 *                       format: fecha
 *                       descripcion: Fecha del evento en formato YYYY-MM-DD.
 *                       example: "2024-10-12"
 *       400:
 *         descripcion: Error en los datos de entrada. Por ejemplo, el correo no es válido o falta información requerida.
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
 *                         descripcion: Mensaje de error correspondiente a la validación fallida
 *                         example: "Debe ser un correo electrónico válido"
 *                       param:
 *                         type: string
 *                         descripcion: El parámetro que falló la validación
 *                         example: "correo"
 *                       locacion:
 *                         type: string
 *                         descripcion: Donde se encontró el error (por ejemplo, en el cuerpo de la solicitud)
 *                         example: "body"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         descripcion: Error interno del servidor, como fallos al crear el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
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
 *         descripcion: Lista de eventos obtenida exitosamente
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
 *                       correo:
 *                         type: string
 *                         descripcion: Correo electrónico del organizador.
 *                         example: "santiago@gmail.com"
 *                       nombre:
 *                         type: string
 *                         descripcion: Nombre del evento.
 *                         example: "comedia v2"
 *                       descripcion:
 *                         type: string
 *                         descripcion: Descripción del evento.
 *                         example: "Evento de prueba"
 *                       locacion:
 *                         type: string
 *                         descripcion: Ubicación del evento.
 *                         example: "calle 52 #9-45, medellin"
 *                       fecha:
 *                         type: string
 *                         format: fecha
 *                         descripcion: Fecha del evento en formato YYYY-MM-DD.
 *                         example: "2024-10-12"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         descripcion: Error interno del servidor, como fallos al obtener la lista de eventos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
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
 *         nombre: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         descripcion: ID del evento a obtener
 *         example: 10
 *       - in: header
 *         nombre: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciUzI1NiIsInR5cCkpXVCJ9..."
 *         descripcion: Token JWT para la autenticación
 *     responses:
 *       200:
 *         descripcion: Evento encontrado exitosamente
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
 *                         descripcion: ID del evento
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         descripcion: ID del usuario asociado
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         descripcion: Nombre del evento
 *                         example: "Evento 1"
 *                       descripcion:
 *                         type: string
 *                         descripcion: Descripción del evento
 *                         example: "Prueba de evento 1"
 *                       created_fecha:
 *                         type: string
 *                         format: fecha-time
 *                         descripcion: Fecha de creación del evento
 *                         example: "2024-10-12T11:32:46.000Z"
 *                       locacion:
 *                         type: string
 *                         descripcion: Ubicación del evento
 *                         example: "-75.5812,6.2442"
 *                       assistance:
 *                         type: integer
 *                         descripcion: Número de asistentes
 *                         example: 0
 *                       event_fecha:
 *                         type: string
 *                         format: fecha-time
 *                         descripcion: Fecha del evento
 *                         example: "2024-10-12T11:32:46.000Z"
 *       400:
 *         descripcion: Error en la validación de parámetros. El ID del evento no es un número entero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "El ID debe ser un número entero"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         descripcion: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Evento con ID 1 no encontrado"
 *       500:
 *         descripcion: Error interno del servidor. Problemas al obtener el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
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
 *                 descripcion: Longitud de la ubicación. Debe estar entre -180 y 180 grados.
 *               lat:
 *                 type: number
 *                 format: float
 *                 example: 6.2442
 *                 descripcion: Latitud de la ubicación. Debe estar entre -90 y 90 grados.
 *               range:
 *                 type: integer
 *                 example: 500
 *                 descripcion: Rango en metros para buscar lugares cercanos. Debe ser un número entero positivo con al menos 3 dígitos.
 *             required:
 *               - longitud
 *               - latitud
 *               - rango
 *     responses:
 *       200:
 *         descripcion: Lista de lugares cercanos encontrados.
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
 *                         descripcion: ID del lugar de interés.
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
 *                       place_nombre:
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
 *         descripcion: Solicitud inválida debido a parámetros incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La longitud debe estar entre -180 y 180 grados"
 *       401:
 *         descripcion: No autorizado. Token de autenticación no proporcionado o inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token de autenticación no válido."
 *       500:
 *         descripcion: Error interno del servidor.
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

/**
 * @swagger
 * /api/eventos/lugares-cercanos-al-evento:
 *   post:
 *     summary: Obtener lugares cercanos a un evento
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
 *               eventoId:
 *                 type: integer
 *                 descripcion: ID del evento para obtener lugares cercanos. Debe ser un número entero positivo.
 *                 example: 10
 *                 minimum: 1
 *               range:
 *                 type: integer
 *                 descripcion: Rango en metros para buscar lugares cercanos. Debe ser un número entero positivo con al menos 3 dígitos.
 *                 example: 1000
 *                 minimum: 100
 *             required:
 *               - eventoId
 *               - range
 *             additionalProperties: false
 *     responses:
 *       200:
 *         descripcion: Lugares cercanos encontrados exitosamente
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
 *                         descripcion: ID del lugar
 *                         example: "poi.1159641197107"
 *                       type:
 *                         type: string
 *                         descripcion: Tipo de entidad
 *                         example: "Feature"
 *                       place_type:
 *                         type: array
 *                         items:
 *                           type: string
 *                         descripcion: Tipos de lugar
 *                         example: ["poi"]
 *                       relevance:
 *                         type: number
 *                         descripcion: Relevancia del lugar
 *                         example: 1
 *                       properties:
 *                         type: object
 *                         descripcion: Propiedades del lugar
 *                         properties:
 *                           foursquare:
 *                             type: string
 *                             descripcion: ID en Foursquare
 *                             example: "51007d3ee4b05400921927dd"
 *                           landmark:
 *                             type: boolean
 *                             descripcion: Indica si es un hito
 *                             example: true
 *                           category:
 *                             type: string
 *                             descripcion: Categoría del lugar
 *                             example: "nail salon, nails, nail shop, manicure, pedicure, shop"
 *                       text:
 *                         type: string
 *                         descripcion: Nombre del lugar
 *                         example: "El Campincito Baños Turcos"
 *                       place_nombre:
 *                         type: string
 *                         descripcion: Nombre completo del lugar
 *                         example: "El Campincito Baños Turcos, Bogotá, 111311, Colombia"
 *                       center:
 *                         type: array
 *                         items:
 *                           type: number
 *                         descripcion: Coordenadas del centro del lugar
 *                         example: [-74.075246, 4.649566]
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             descripcion: Tipo de geometría
 *                             example: "Point"
 *                           coordinates:
 *                             type: array
 *                             items:
 *                               type: number
 *                             descripcion: Coordenadas del lugar
 *                             example: [-74.075246, 4.649566]
 *                       context:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               descripcion: ID del contexto
 *                               example: "postcode.4247090"
 *                             mapbox_id:
 *                               type: string
 *                               descripcion: ID en Mapbox
 *                               example: "dXJuOm1ieHBsYzpRTTR5"
 *                             text:
 *                               type: string
 *                               descripcion: Texto del contexto
 *                               example: "111311"
 *       400:
 *         descripcion: Error en la validación de parámetros. El ID del evento o el rango no son válidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "El ID del evento debe ser un número entero positivo y el rango debe ser un número entero positivo con al menos 3 dígitos"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       500:
 *         descripcion: Error interno del servidor. Problemas al obtener los lugares cercanos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Error al obtener los lugares cercanos: [Descripción del error]"
 */
rutas.post("/lugares-cercanos-al-evento", autenticacion, eventoController.obtenerUbicacionesCercanasAlEvento)

/**
 * @swagger
 * /api/eventos/{eventoId}:
 *   put:
 *     summary: Actualizar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         nombre: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         descripcion: ID del evento a actualizar
 *         example: 10
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 format: correo
 *                 descripcion: Correo electrónico del organizador del evento.
 *                 example: "user@gmail.com"
 *               nombre:
 *                 type: string
 *                 descripcion: Nombre del evento.
 *                 example: "actualizando este evento"
 *               descripcion:
 *                 type: string
 *                 descripcion: Descripción del evento.
 *                 example: "Evento actualizado de prueba"
 *               locacion:
 *                 type: string
 *                 descripcion: Ubicación del evento.
 *                 example: "Ave Cra 30 #45-3, Bogotá"
 *               fecha:
 *                 type: string
 *                 format: fecha
 *                 descripcion: Fecha del evento en formato YYYY-MM-DD.
 *                 example: "2024-07-01"
 *     responses:
 *       200:
 *         descripcion: Evento actualizado exitosamente
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
 *                     correo:
 *                       type: string
 *                       format: correo
 *                       example: "user@gmail.com"
 *                     nombre:
 *                       type: string
 *                       example: "actualizando este evento"
 *                     descripcion:
 *                       type: string
 *                       example: "Evento actualizado de prueba"
 *                     locacion:
 *                       type: string
 *                       example: "Ave Cra 30 #45-3, Bogotá"
 *                     fecha:
 *                       type: string
 *                       format: fecha
 *                       example: "2024-07-01"
 *       400:
 *         descripcion: Error en la validación de parámetros. Puede ser que el ID del evento no sea un número entero positivo o que los campos del cuerpo no cumplan con los requisitos.
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
 *                         descripcion: Descripción del error
 *                         example: "El ID del evento debe ser un número entero positivo"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         descripcion: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Evento con ID 10 no encontrado"
 *       500:
 *         descripcion: Error interno del servidor. Problemas al actualizar el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Error al actualizar el evento: [Descripción del error]"
 */
rutas.put("/actualizar-evento", autenticacion, eventoController.actualizarEvento)

/**
 * @swagger
 * /api/eventos/{eventoId}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         nombre: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *         descripcion: ID del evento a eliminar
 *         example: 10
 *     responses:
 *       200:
 *         descripcion: Evento eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: "Evento eliminado exitosamente"
 *       400:
 *         descripcion: Error en la validación del ID. El ID proporcionado no es un número entero.
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
 *                         descripcion: Descripción del error
 *                         example: "El ID debe ser un número entero"
 *       401:
 *         descripcion: No autorizado. El token es inválido o no fue proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Token no proporcionado o inválido"
 *       404:
 *         descripcion: Evento no encontrado. El ID proporcionado no corresponde a ningún evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Evento con ID 10 no encontrado"
 *       500:
 *         descripcion: Error interno del servidor. Problemas al eliminar el evento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   descripcion: Descripción del error
 *                   example: "Error al eliminar el evento: [Descripción del error]"
 */
rutas.delete("/eliminar-evento/:eventoId", autenticacion, eventoController.eliminar);

module.exports = rutas;