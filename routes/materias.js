import express from "express";
import {
  getAllMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
  getMateriasByCarrera,
  getMateriasByMaestro
} from "../controllers/materiasController.js";

const router = express.Router();

// CRUD básico
router.get("/", getAllMaterias);
router.get("/:id", getMateriaById);
router.post("/", createMateria);
router.put("/:id", updateMateria);
router.delete("/:id", deleteMateria);

// Rutas especiales
router.get("/carrera/:carrera", getMateriasByCarrera);
router.get("/maestro/:idMaestro", getMateriasByMaestro);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta materias:', err);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default router;