import { check, validationResult } from 'express-validator';
/**
 * Middleware para validar datos de entrada
 */

// Validar campos requeridos
export const validateRequired = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).send(`El campo ${field} es requerido.`)
      }
    }
    next()
  }
}

// Validar que un campo sea numérico
export const validateNumeric = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (req.body[field] && isNaN(req.body[field])) {
        return res.status(400).send(`El campo ${field} debe ser numérico.`)
      }
    }
    next()
  }
}

// Validar longitud máxima de un campo
export const validateMaxLength = (field, maxLength) => {
  return (req, res, next) => {
    if (req.body[field] && req.body[field].length > maxLength) {
      return res.status(400).send(`El campo ${field} no debe exceder ${maxLength} caracteres.`)
    }
    next()
  }
}

// Validaciones para el formulario de registro
export const validarRegistro = [
    check('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    
    check('username')
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio.'),
    
    check("password")
        .isLength({ min: 2 })
        .withMessage("La contraseña debe tener al menos 2 caracteres"),
    
    check("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("La contraseña no coincide")
];

// Middleware para manejar errores de validación
export const erroresDeValidacion = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = Object.values(validationErrors.mapped());
        const errorsArr = errors.map(item => item.msg);
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }
    next(); // continuar si no hay errores
};

// Middleware para verificar autenticación
export const isAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next();
    }
    res.redirect('/login');
};

// Exportación alternativa (opcional - solo si prefieres exportar todo al final)
export default {
    validarRegistro,
    erroresDeValidacion,
    isAuthenticate
};
