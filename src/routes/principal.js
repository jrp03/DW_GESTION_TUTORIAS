const express = require('express');
const router = express.Router()
const path = require('path');3

router.get("/", (req, res) => {
    res.render('principal', { title: 'Principal' });
});
router.get("/materias", (req, res) => {
    res.render('materias', { title: 'Materias' });
});
router.get("/registro_asesor", (req, res) => {
    res.render('registros_asesores', { title: 'Registro Asesor' });
});

module.exports = router;