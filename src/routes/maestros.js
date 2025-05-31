const express = require('express');
const maestrosController = require('../controllers/maestrosController');

const router = express.Router()

// Rutas para el módulo de maestros
router.get("/", maestrosController.getAll)
router.get("/materias", maestrosController.getMaterias)
router.get("/:id", maestrosController.getById)
router.post("/guardar", maestrosController.create)
router.post("/editar", maestrosController.update)
router.post("/eliminar", maestrosController.deleteMaestro)

module.exports = router;