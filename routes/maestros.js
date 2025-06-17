import express from "express";
import { maestrosController } from "../controllers/maestrosController.js";

const router = express.Router();

// CRUD estándar
router.get("/", maestrosController.getAll);
router.get("/:id", maestrosController.getById);
router.post("/", maestrosController.create);
router.put("/:id", maestrosController.update);
//router.patch("/:id", partialUpdate);
router.delete("/:id", maestrosController.delete);

// Rutas adicionales
router.get("/:id/materias", maestrosController.getMateriasByMaestro);
router.get("/carrera/:carrera", maestrosController.getByCarrera);
router.get("/materias/listado", maestrosController.getMaterias)
router.get("/carreras/listado", maestrosController.getCarreras);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta maestros:', err);
  res.status(500).json({ STATUS: "ERROR", ERROR: "Error en gestión de maestros" });
});

export default router;