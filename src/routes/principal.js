const express = require('express');
const router = express.Router()
const path = require('path'); 
const auth = require('../middelwares/authValidation')


// Ruta pagina Raiz de principal; igual a /principal de index.js
router.get('/', auth.isAuthenticate ,(req, res, next) => {
    res.render('principal.ejs', { title: 'Principal' });
});

// 
router.get("/materias", (req, res) => {
    res.render('materias', { title: 'Materias' });
});
router.get("/registro_asesor", (req, res) => {
    res.render('registros_asesores', { title: 'Registro Asesor' });
});


router.get("/asignar_asesor", (req, res) => {
    res.render('asignar_asesor', { title: 'Asignar Asesor' });
});
router.get("/ver_registros", (req, res) => {
    res.render("ver_registros", { title: 'Registros de Asesores' });
});

router.get("/gestion_asesores", (req, res) => {
    res.render('gestion_asesores', { title: 'Gestion De Asesores' })
});

module.exports = router;