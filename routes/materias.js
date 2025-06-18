import express from "express";
import { materiasController } from "../controllers/materiasController.js";

const router = express.Router();

// CRUD básico
router.get("/", materiasController.getAll);
router.get("/:id", materiasController.getById);
router.post("/", materiasController.create);
router.put("/:id", materiasController.update);
router.delete("/:id", materiasController.delete);

// Rutas especiales
router.get("/carrera/:carrera", materiasController.getByCarrera);
router.get("/maestro/:idMaestro", materiasController.getByMaestro);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta materias:', err);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default router;