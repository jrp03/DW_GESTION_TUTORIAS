const express = require('express');
const router = express.Router()
const path = require('path'); 
const auth = require('../middelwares/authValidation')

// Routes a opciones dentro de pagina principal
const maestrosRoutes = require('./maestros');
const asesoresRoutes = require('./asesores');
const mastersRoutes = require('./masters');
const materiasRoutes = require('./materias');
const solicitudesRoutes = require('./solicitudes');


// Ruta pagina Raiz de principal ya autenticada; link acceso localhost(puerto)/principal/
router.get('/', auth.isAuthenticate ,(req, res, next) => {
    res.render('principal.ejs', { title: 'Principal' });
});

// Redirecciones a acceso para peticiones CRUD de cada pagina
router.use("/materias", materiasRoutes); // link acceso localhost(puerto)/principal/materias
router.use("/maestros", maestrosRoutes); // link acceso localhost(puerto)/principal/maestros
router.use("/asesores", asesoresRoutes); // link acceso localhost(puerto)/principal/asesores
router.use("/solicitudes", solicitudesRoutes); // link acceso localhost(puerto)/principal/solicitudes
router.use("/masters", mastersRoutes); // link acceso localhost(puerto)/principal/masters


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