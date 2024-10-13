const { body, param, validationResult } = require('express-validator');

const validador = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validarRegistroAsistencia = [
    body('eventoId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero positivo'),
    body('usuarioId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo'),
    body('fecha')
        .isISO8601()
        .withMessage('La fecha debe ser válida en formato YYYY-MM-DD'), validador
];

const validarAsitenciaId = [
    param('asistenciaId')
        .isInt({ min: 1 })
        .withMessage('El ID del asistente debe ser un número entero positivo'), validador
];

const validarObtenerAsistentesPorUsuario = [
    param('usuarioId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo')
];

const validarObtenerAsistentesPorEvento = [
    param('eventoId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero positivo')
];

const validarActualizacionAsistente = [
    param('asistenciaId')
        .isInt({ min: 1 })
        .withMessage('El ID del asistente debe ser un número entero positivo'),
    body('eventoId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero positivo'),
    body('usuarioId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo'),
    body('fecha')
        .isISO8601()
        .withMessage('La fecha debe ser válida en formato YYYY-MM-DD')
];

module.exports = { validarRegistroAsistente: validarRegistroAsistencia, validarAsitenteId: validarAsitenciaId, validarObtenerAsistentesPorUsuario, validarObtenerAsistentesPorEvento, validarActualizacionAsistente };