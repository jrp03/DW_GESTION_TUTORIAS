const express = require('express');
const maestrosController = require('../controllers/maestrosController');

const router = express.Router()

// Rutas para el módulo de maestros
router.get("/", maestrosController.getMaestros) // GET todos los maestros
router.get("/materias", maestrosController.getMateriasPorMaestro) // GET materias por maestro
router.get("/:id", maestrosController.getMaestroById) // GET un maestro por ID
router.post("/", maestrosController.createMaestro) // POST nuevo maestro
router.put("/:id", maestrosController.updateMaestro) // PUT actualizar maestro
router.delete("/:id", maestrosController.deleteMaestro) // DELETE eliminar maestro

module.exports = router;