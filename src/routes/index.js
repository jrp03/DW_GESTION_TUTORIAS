const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middelwares/authValidation');
// const { resolveInclude } = require('ejs');
require('../middelwares/passporController')(passport);

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/login', authController.login); // Accede a la pagina de inicio de sesion);

router.post('/login', passport.authenticate('local-login',{
    successRedirect: '/principal',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true
}));

router.get('/register', authController.register); // Accede a la pagina de registro

router.post('/register', auth.validarRegistro,auth.erroresDeValidacion, passport.authenticate('local-register', {
    successRedirect: '/login',
    failureRedirect: '/register',
    successFlash: true,
    failureFlash: true
}));

// ------ Rutas privadas

router.get('/principal', (req, res, next) => {
    res.render('principal.ejs');
});



module.exports = router;
// Exporta el router para que pueda ser utilizado en otros archivos