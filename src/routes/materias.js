// routes/materias.js
const express = require('express');
const materiasController = require('../controllers/materiasController');

const router = express.Router();

// Rutas REST para el módulo de materias
router.get("/", materiasController.getMaterias);           // GET todas las materias
router.get("/:id", materiasController.getMateriaById);     // GET una materia por ID
router.post("/", materiasController.createMateria);        // POST nueva materia
router.put("/:id", materiasController.updateMateria);      // PUT actualizar materia
router.delete("/:id", materiasController.deleteMateria);   // DELETE eliminar materia

router.get("/test", (req, res) => {
    res.send("Test de materias funcionando correctamente");
});

module.exports = router;
