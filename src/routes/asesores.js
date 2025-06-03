const express = require('express');
const asesoresController = require('../controllers/asesoresController');

const router = express.Router();

// Rutas para el módulo de asesores
router.get("/", asesoresController.getAsesores) // GET todos los asesores
router.get("/materias", asesoresController.getMateriasAlumno) // GET materias por alumno
router.get("/maestros", asesoresController.getMaestrosAlumno) // GET maestros por alumno
router.get("/:id", asesoresController.getAsesorById) // GET un asesor por ID
router.post("/", asesoresController.createAsesor) // POST nuevo asesor
router.put("/:id", asesoresController.updateAsesor) // PUT actualizar asesor
router.delete("/:id", asesoresController.deleteAsesor) // DELETE eliminar asesor


module.exports = router;