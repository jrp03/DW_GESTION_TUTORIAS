import express from "express";
import authRoutes from "./auth.js";
import materiasRoutes from "./materias.js";
import maestrosRoutes from "./maestros.js";
import asesoresRoutes from "./asesores.js";
import solicitudesRoutes from "./solicitudes.js";
import mastersRoutes from "./masters.js";

const router = express.Router();

// Configuración de rutas principales
router.use("/api/auth", authRoutes);
router.use("/api/materias", materiasRoutes);
router.use("/api/maestros", maestrosRoutes);
router.use("/api/asesores", asesoresRoutes);
router.use("/api/solicitudes", solicitudesRoutes);
router.use("/api/masters", mastersRoutes);

// Ruta por defecto
router.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Manejo centralizado de errores
router.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ 
    STATUS: "ERROR", 
    ERROR: "Error interno del servidor",
    DETAILS: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

export default router;