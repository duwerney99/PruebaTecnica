const express = require("express");
const rutas = express.Router();
const usuarioController = require('../controladores/ControladorUsuario')



/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: holamundo@midominio.com
 *               name:
 *                 type: string
 *                 description: El nombre del usuario
 *                 example: holamundo
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: 11223344
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
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
 *                       description: Correo electrónico del usuario registrado
 *                       example: holamundo@midominio.com
 *                     password:
 *                       type: string
 *                       description: Contraseña cifrada del usuario
 *                       example: $2a$10$gCVcMPeWXFtLfiBHQzoqg.WWwQssibJ7sN7ariTBWRPOVhQ57ghoy
 *                     name:
 *                       type: string
 *                       description: Nombre del usuario registrado
 *                       example: holamundo
 *                     registration_date:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora de registro del usuario
 *                       example: 2024-09-16T02:13:57.694Z
 *       400:
 *         description: Error en la validación de los datos. Por ejemplo, si el email no es válido, la contraseña es muy corta o el nombre está vacío.
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
 *                         examples:
 *                           email:
 *                             value: Debe ser un correo válido
 *                           password:
 *                             value: La contraseña debe tener al menos 4 caracteres
 *                           name:
 *                             value: El nombre es obligatorio
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         examples:
 *                           email:
 *                             value: email
 *                           password:
 *                             value: password
 *                           name:
 *                             value: name
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en el cuerpo de la solicitud)
 *                         example: body
 *       500:
 *         description: Error interno del servidor
 */

rutas.post('/', usuarioController.RegistrarUsuario);



/**
 * @swagger
 * /api/usuarios/inicio-sesion:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: tu-usuario@dominio.com
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el usuario
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error en la validación de los datos. Por ejemplo, si el email no es válido o la contraseña está vacía.
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
 *                         examples:
 *                           email:
 *                             value: Debe ser un correo válido
 *                           password:
 *                             value: La contraseña es obligatoria
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         examples:
 *                           email:
 *                             value: email
 *                           password:
 *                             value: password
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en el cuerpo de la solicitud)
 *                         example: body
 *       401:
 *         description: El usuario no existe en la base de datos o las credenciales son incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario no existe o las credenciales no son válidas
 *                   example: "Credenciales incorrectas o el usuario no existe"
 *       500:
 *         description: Error interno del servidor
 */


rutas.post("/inicio-sesion", usuarioController.InicioSesion);




module.exports = rutas