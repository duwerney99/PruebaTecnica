const { body, param , validationResult } = require('express-validator');

const validador = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validarCreacionEvento = [
    body('correo')
        .isEmail().withMessage('Debe ser un correo electrónico válido'),
    body('nombre')
        .notEmpty().withMessage('El nombre del evento es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('La descripción del evento es obligatoria'),
    body('locacion')
        .notEmpty().withMessage('La ubicación del evento es obligatoria')
        .isLength({ min: 5 }).withMessage('La ubicación debe tener al menos 5 caracteres'),
    body('fecha_evento')
        .notEmpty().withMessage('La locacion del evento es obligatoria')
        .isISO8601().withMessage('Debe ser una locacion válida en formato YYYY-MM-DD'),
        validador
];

const validarEventoId = [
    param('eventoId').isInt().withMessage('El ID debe ser un número entero'),validador
];

const validarLugaresCercanos = [
    body('longitud')
        .isFloat({ min: -180, max: 180 }).withMessage('La longitudgitud debe estar entre -180 y 180 grados'),
    body('latitud')
        .isFloat({ min: -90, max: 90 }).withMessage('La latituditud debe estar entre -90 y 90 grados'),
    body('rango')
        .isInt({ min: 100 }).withMessage('El rango debe ser un número entero positivo y debe tener al menos 3 digitos'),
        validador
];

const validarLugaresCercanosAlEvento = [
    body('eventoId')
        .isInt({ min: 1 }).withMessage('El ID del evento debe ser un número entero positivo'),
    body('rango')
        .isInt({ min: 100 }).withMessage('El rango debe ser un número entero positivo y debe tener al menos 3 digitos'),
        validador
];

const validarCargueMasivo = [
    (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ errors: [{ msg: 'Se debe proporcionar un archivo Excel' }] });
        }

        const file = req.file;
        const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ errors: [{ msg: 'El archivo debe ser de tipo Excel' }] });
        }

        const fileExtension = file.originalnombre.split('.').pop().toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
            return res.status(400).json({ errors: [{ msg: 'El archivo debe tener una extensión .xlsx o .xls' }] });
        }
        next();
    },
    validador
];


const validarActualizacionEvento = [
    param('eventoId')
        .isInt({ min: 1 }).withMessage('El ID del evento debe ser un número entero positivo'),

    body('correo')
        .optional()
        .isEmail().withMessage('Debe ser un correo electrónico válido'),

    body('nombre')
        .optional()
        .notEmpty().withMessage('El nombre del evento no puede estar vacío')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    body('descripcion')
        .optional()
        .notEmpty().withMessage('La descripción del evento no puede estar vacía'),

    body('locacion')
        .optional()
        .notEmpty().withMessage('La ubicación del evento no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La ubicación debe tener al menos 5 caracteres'),

    body('fecha_evento')
        .optional()
        .isISO8601().withMessage('Debe ser una locacion válida en formato YYYY-MM-DD'),
    validador
];

module.exports = { validarCreacionEvento, validarEventoId, validarLugaresCercanos, validarLugaresCercanosAlEvento, validarCargueMasivo,validarActualizacionEvento };
