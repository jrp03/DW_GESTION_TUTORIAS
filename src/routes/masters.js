const express = require('express');
const mastersController = require('../controllers/mastersController');

const router = express.Router()

// Rutas para el módulo de masters
router.get("/maestros", mastersController.getMaestros)
router.get("/materias", mastersController.getMaterias)
router.get("/asesores", mastersController.getAsesores)
router.get("/solicitudes", mastersController.getSolicitudes)
router.post("/buscar", mastersController.buscar)

module.exports = router;
