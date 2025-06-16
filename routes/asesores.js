import express from "express";
import { asesoresController } from "../controllers/asesoresController.js";

const router = express.Router();

// Rutas RESTful estándar
router.get("/", asesoresController.getAll);
router.get("/:id", asesoresController.getById);
router.post("/", asesoresController.create);
router.put("/:id", asesoresController.update);
router.delete("/:id", asesoresController.delete);

// Rutas especializadas
router.get("/maestros/listado", asesoresController.getMaestros);
router.get("/materias/listado", asesoresController.getMaterias);

// Manejo de errores centralizado
router.use((err, req, res, next) => {
  console.error('Error en ruta asesores:', err);
  res.status(500).json({ STATUS: "ERROR", ERROR: "Error interno del servidor" });
});

export default router;