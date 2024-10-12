const { body, param , validationResult } = require('express-validator');

const validador = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validarRegistroUsuario = [
    body('correo').isEmail().withMessage('Debe ser un correo válido'),
    body('contrasena').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),validador
];

const validarInicioSesion = [
    body('correo').isEmail().withMessage('Debe ser un correo válido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),validador
];

const validarUsuarioId = [
    param('usuarioId').isInt().withMessage('El ID debe ser un número entero'),validador
];

const validarActualizacionUsuario = [
    param('usuarioId').isInt().withMessage('El ID debe ser un número entero'),
    body('correo').optional().isEmail().withMessage('Debe ser un correo válido'),
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),validador
];

module.exports = {
    validarRegistroUsuario,
    validarInicioSesion,
    validarUsuarioId,
    validarActualizacionUsuario
};
