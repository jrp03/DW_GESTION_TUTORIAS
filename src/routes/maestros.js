const express = require('express');
const maestrosController = require('../controllers/maestrosController');

const router = express.Router()

// Rutas para el módulo de maestros
<<<<<<< HEAD
router.get("/", maestrosController.getAll)
router.get("/materias", maestrosController.getMaterias)
router.get("/:id", maestrosController.getById)
router.post("/guardar", maestrosController.create)
router.post("/editar", maestrosController.update)
router.post("/eliminar", maestrosController.deleteMaestro)
=======
router.get("/", maestrosController.getMaestros) // GET todos los maestros
router.get("/materias", maestrosController.getMateriasPorMaestro) // GET materias por maestro
router.get("/:id", maestrosController.getMaestroById) // GET un maestro por ID
router.post("/", maestrosController.createMaestro) // POST nuevo maestro
router.put("/:id", maestrosController.updateMaestro) // PUT actualizar maestro
router.delete("/:id", maestrosController.deleteMaestro) // DELETE eliminar maestro
>>>>>>> prueba-validacion

module.exports = router;