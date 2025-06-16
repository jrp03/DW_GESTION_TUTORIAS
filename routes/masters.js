import express from "express";
import { mastersController } from "../controllers/mastersController.js";

const router = express.Router();

// Rutas de búsqueda avanzada
router.get("/maestros", mastersController.getMaestros);
router.get("/materias", mastersController.getMaterias);
router.get("/asesores", mastersController.getAsesores);
router.get("/solicitudes", mastersController.getSolicitudes);
router.post("/buscar", mastersController.buscarAvanzada);

// Filtros combinados
router.get("/filtros/completos", mastersController.getFiltrosCompletos);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta masters:', err);
  res.status(500).json({ 
    STATUS: "ERROR", 
    ERROR: "Error en búsqueda avanzada",
    DETAILS: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

export default router;