import express from "express";
//import authRoutes from "./auth.js";
import asesoresRoutes from "./asesores.js";
import maestrosRoutes from "./maestros.js";
import mastersRoutes from "./masters.js";
import materiasRoutes from "./materias.js";
import solicitudesRoutes from "./solicitudes.js";

import { authController } from "../controllers/authController.js";

const router = express.Router();

// Rutas de autenticación
router.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(staticPath, "register.html"));
});

router.get('/user/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
});
router.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});


// API Auth  
router.post("/login", authController.login); // Ruta directa al login 
router.post("/register", authController.register);
router.post("/guest-login", authController.guestLogin);
router.get("/verify", authController.verifyToken);
router.post("/logout", authController.logout);

// Configuración de rutas principales
//router.use("/api/auth", authRoutes);
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