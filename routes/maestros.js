import express from "express";
import { 
  getAll,
  getById,
  create,
  update,
  partialUpdate,
  deleteMaestro,
  getMateriasByMaestro,
  getByCarrera
} from "../controllers/maestrosController.js";

const router = express.Router();

// CRUD estándar
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id", partialUpdate);
router.delete("/:id", deleteMaestro);

// Rutas adicionales
router.get("/:id/materias", getMateriasByMaestro);
router.get("/carrera/:carrera", getByCarrera);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta maestros:', err);
  res.status(500).json({ STATUS: "ERROR", ERROR: "Error en gestión de maestros" });
});

export default router;