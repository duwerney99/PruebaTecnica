Reto REST Backend Node
Este proyecto es una aplicación desarrollada en Node.js, que se ejecuta dentro de contenedores Docker y está configurada con Nginx como proxy inverso.

Esta aplicación ha sido creada como parte de un reto profesional Mid Backend Node.js. Proporciona un microservicio RESTful que permite a los 
usuarios registrarse, iniciar sesión, gestionar eventos, usuarios y 
asistencias, y realizar peticiones a una base de datos.


### VIDEO EXPLICANDO EN YOUTUBE
https://www.youtube.com/watch?v=JKUGlh_vzK0

## Requisitos Previos
Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Docker](https://www.docker.com/get-started) 
- [Docker Compose](https://docs.docker.com/compose/install/)

## Características
Usuarios: Registro, inicio de sesión, obtención de token de acceso, actualización, obtención por ID y eliminación.
Eventos: Creación, actualización, eliminación y obtención de eventos.
Asistencias: Relación entre usuarios y eventos. Un usuario puede asistir a varios eventos, y un evento puede tener múltiples usuarios.
Autenticación JWT: Uso de tokens para proteger rutas.
Cargue masivo de eventos 


## Instalación
Sigue los pasos a continuación para instalar y configurar el proyecto localmente:

Clona el repositorio:

bash
Copiar código
git clone https://github.com/duwerney99/PruebaTecnica.git
Ingresa a la carpeta del proyecto y sitúate en la raíz, donde se encuentra el archivo package.json:

bash
Copiar código
cd PruebaTecnica
Instala las dependencias:

bash
Copiar código
npm install
Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

bash
Copiar código
PORT=8083
JWT_SECRET=your_jwt_secret
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
Inicia la aplicación en modo desarrollo:

bash
Copiar código
npm run dev
La aplicación se ejecutará en el puerto 8083 por defecto.

Uso
Una vez que la aplicación esté en funcionamiento, podrás interactuar con las siguientes rutas:

Autenticación
Registro de usuarios: POST /api/registrar-usuario
Inicio de sesión: POST /api/inicio-sesion
Obtener usuarios: GET /api/consultar-usuarios (requiere token)
Buscar usuario por ID: GET /api/consultar-usuario-por-id/:usuarioId (requiere token)
Actualizar usuario: PUT /api/actualizar-usuario/:usuarioId (requiere token)
Eliminar usuario: DELETE /eliminar-usuario/:usuarioId (requiere token)


Eventos
Crear evento: POST /api/crear-evento (requiere token)
Obtener eventos: GET /api/obtener-eventos  (requiere token)
Buscar evento por ID: GET /api/obtener-evento-por-id/:usuarioId   (requiere token)
Actualizar evento: PUT /api/actualizar-evento/:usuarioId (requiere token)
Eliminar evento: DELETE /api/eliminar-evento/:usuarioId (requiere token)
Buscar eventos por lugares cercanos: POST /api/lugares-cercanos (requiere token)
Obtener evento lugares cercanos por evento: POST /api/lugares-cercanos-al-evento (requiere token)

Asistencias
Registrar asistencia: POST /api/registrar-asistencia (requiere token)
Obtener asistencias: GET /api/obtener-asistencias   (requiere token)
Actualizar asistencia: PUT /api/actualizar-asistencia/:usuarioId (requiere token)
Eliminar asistencia: DELETE /api/eliminar-asistencia/:usuarioId (requiere token)
Obtener asistencia por usuario: POST /api/obtener-asistentes-registrados-usuario/:usuarioId(requiere token)
Obtener asistencia por evento: POST obtener-asistencia-evento/:eventoId (requiere token)

Tecnologías utilizadas
Node.js
Express.js
PostgreSQL (u otra base de datos configurada)
JWT (JSON Web Tokens) para autenticación
Swagger para documentación de API
Multer para manejo de archivos
bcryptjs para hashing de contraseñas
Scripts
npm run dev: Inicia la aplicación en modo desarrollo usando nodemon.
npm test: Ejecuta los tests con jest.
