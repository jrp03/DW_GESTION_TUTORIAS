const express = require('express');
const solicitudesController = require('../controllers/solicitudesController');

const router = express.Router()

// Rutas para el módulo de solicitudes
router.get("/", solicitudesController.getAll)
router.get("/materias", solicitudesController.getMaterias)
router.get("/asesores", solicitudesController.getAsesores)
router.get("/:id", solicitudesController.getById)
router.post("/guardar", solicitudesController.create)
router.post("/editar", solicitudesController.update)
router.post("/eliminar", solicitudesController.deleteSolicitud)

module.exports = router;