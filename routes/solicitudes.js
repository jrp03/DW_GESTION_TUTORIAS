import express from "express";
import {
  getAll,
  getById,
  getByEstado,
  getByAlumno,
  getByAsesor,
  getByMateria
} from "../controllers/solicitudesController.js";

const router = express.Router();

// Rutas principales
router.get("/", getAll);
router.get("/:id", getById);

// Rutas adicionales
router.get("/estado/:estado", getByEstado);
router.get("/alumno/:idAlumno", getByAlumno);
router.get("/asesor/:idAsesor", getByAsesor);
router.get("/materia/:idMateria", getByMateria);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta solicitudes:', err);
  res.status(500).json({ 
    STATUS: "ERROR", 
    ERROR: "Error en gestión de solicitudes",
    DETAILS: err.message
  });
});

export default router;