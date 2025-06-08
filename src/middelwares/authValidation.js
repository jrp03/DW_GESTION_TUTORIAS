const {check} = require('express-validator');
const {validationResult} = require('express-validator');

const validarRegistro = [
    check('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
     check('username').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    check("password")
        .isLength({min: 2})
        .withMessage("La contraseña debe tener al menos 2 caracteres"),

    check("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("La contraseña no coincide")
];

const erroresDeValidacion = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    const errorsArr = errors.map(item => item.msg);
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }
  next(); // continuar si no hay errores
};

function isAuthenticate(req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  }
  res.redirect('/login');
}


module.exports = {
    validarRegistro,
    erroresDeValidacion,
    isAuthenticate
}