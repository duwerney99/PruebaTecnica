const express = require("express");
const rutas = express.Router();
const usuarioController = require('../controladores/ControladorUsuario');
const controladorInicioSesion = require('../controladores/ControladorIncioSesion');
const autenticacion = require('../autenticacion/Autenticacion');
const {
    validarRegistroUsuario,
    validarInicioSesion,
    validarUsuarioId,
    validarActualizacionUsuario
} = require('../utilidades/validaciones/ValidacionesUsuario');

/**
 * @swagger
 * /api/registrar-usuario:
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
 *                 example: santiago@gmail.com
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
 *                       example: santiago@gmail.com
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
rutas.post('/registrar-usuario', validarRegistroUsuario, usuarioController.registrarUsuario);

/**
 * @swagger
 * /api/inicio-sesion:
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
rutas.post("/inicio-sesion", validarInicioSesion, controladorInicioSesion.ejecutar);

/**
 * @swagger
 * /api/consultar-usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *         description: Token JWT para la autenticación
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: ID del usuario
 *                     example: 2
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                     example: santiago@gmail.com
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                     example: santiagoo actualizado
 *                   password:
 *                     type: string
 *                     description: Contraseña cifrada del usuario
 *                     example: $2a$10$SAYVMm9.03pkWEgQR.m4vecBWdrEf.pN8KiwLTUGK2qqQZ7amIlyK
 *                   registration_date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de registro del usuario
 *                     example: 2024-10-11T012:40:50.000Z
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
 *         description: Error interno del servidor
 */
rutas.get("/consultar-usuarios", autenticacion, usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/{usuarioId}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *         example: 12
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *         description: Token JWT para la autenticación
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: ID del usuario
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                   example: santiago@gmail.com
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                   example: user
 *                 password:
 *                   type: string
 *                   description: Contraseña cifrada del usuario
 *                   example: $2a$10$HjhtXTJWUIEpZOktghLy1OYUSfal5JCIMnCqWva25jWTZsmCgfHgG
 *                 registration_date:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de registro del usuario
 *                   example: 2024-10-11T12:45:00.000Z
 *       400:
 *         description: Error en el parámetro de ID. El ID debe ser un número entero.
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
 *                         example: El ID debe ser un número entero
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         example: usuarioId
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en la ruta)
 *                         example: path
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
 *         description: Usuario no encontrado. El ID proporcionado no corresponde a ningún usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 */
rutas.get("/consultar-usuario-por-id/:usuarioId", validarUsuarioId, autenticacion, usuarioController.obtenerUsuario);

/**
 * @swagger
 * /api/{usuarioId}:
 *   put:
 *     summary: Actualizar los detalles de un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *         example: 12
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
 *         description: Token JWT para la autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario
 *                 example: nuevo-email@dominio.com
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *                 example: NuevoNombre
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *                 example: nuevaContraseña123
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
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
 *                     user_id:
 *                       type: integer
 *                       description: ID del usuario actualizado
 *                       example: 1
 *                     email:
 *                       type: string
 *                       description: Nuevo correo electrónico del usuario
 *                       example: nuevo-email@dominio.com
 *                     name:
 *                       type: string
 *                       description: Nuevo nombre del usuario
 *                       example: NuevoNombre
 *                     password:
 *                       type: string
 *                       description: Contraseña cifrada del usuario
 *                       example: $2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxx
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora de la última actualización
 *                       example: 2024-10-11T9:26:00.000Z
 *       400:
 *         description: Error en la validación de los datos
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
 *                         description: Descripción del error
 *                         example: "El correo debe ser válido"
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         example: email
 *                       location:
 *                         type: string
 *                         description: Lugar donde se encontró el error (por ejemplo, body)
 *                         example: body
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
 *         description: Usuario no encontrado. El ID proporcionado no corresponde a ningún usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 */
rutas.put("/actualizar-usuario", validarActualizacionUsuario, autenticacion, usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/{usuarioId}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *         example: 12
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         description: Token JWT para la autenticación
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
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
 *                   description: Mensaje de confirmación de eliminación
 *                   example: Usuario eliminado exitosamente
 *       400:
 *         description: Error en los datos de entrada. Por ejemplo, el ID no es un número entero o hay datos inválidos.
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
 *                         example: El ID debe ser un número entero
 *                       param:
 *                         type: string
 *                         description: El parámetro que falló la validación
 *                         example: usuarioId
 *                       location:
 *                         type: string
 *                         description: Donde se encontró el error (por ejemplo, en la ruta)
 *                         example: path
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
 *         description: Usuario no encontrado. El ID proporcionado no corresponde a ningún usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Usuario con ID 12 no encontrado"
 *       500:
 *         description: Error interno del servidor, como fallos al verificar la existencia del usuario o al realizar la eliminación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *                   example: "Error al eliminar el usuario: No se pudo verificar la existencia del usuario con ID 200"
 */
rutas.delete("/eliminar-usuario/:usuarioId",validarUsuarioId, autenticacion, usuarioController.eliminarUsuario);


module.exports = rutas