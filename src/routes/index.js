const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middelwares/authValidation');
// const { resolveInclude } = require('ejs');
require('../middelwares/passporController')(passport);

// Router de paginas privadas
const maestrosRoutes = require('./maestros');
const asesoresRoutes = require('./asesores');
const mastersRoutes = require('./masters');
const materiasRoutes = require('./materias');
const solicitudesRoutes = require('./solicitudes');
const principalRoutes = require('./principal');


// Acceder a pagina de inicio
router.get('/', (req, res) => {
    res.render('index.ejs');
});

// Acceso a paginas de validacion
router.get('/login', authController.login); // Accede a la pagina inicio de sesion

// Valida que el usuario este registrado
router.post('/login', auth.validarRegistro, passport.authenticate('local-login',{
    successRedirect: '/principal',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
}));

// Acceso a la pagina de registro
router.get('/register', authController.register); // Accede a la pagina de registro

// Registro de usuario
router.post('/register', auth.validarRegistro,auth.erroresDeValidacion, passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    successFlash: true,
    failureFlash: true
}));

// Cerrar sesion
router.get('/Salir', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// ------ Rutas privadas

//router.get('/principal', auth.isAuthenticate ,(req, res, next) => {
//    res.render('principal.ejs');
//});

router.use("/materias", materiasRoutes);
router.use("/maestros", maestrosRoutes);
router.use("/asesores", asesoresRoutes);
router.use("/solicitudes", solicitudesRoutes);
router.use("/masters", mastersRoutes);
router.use("/principal", principalRoutes);


module.exports = router;
// Exporta el router para que pueda ser utilizado en otros archivos