import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { authController } from "../controllers/authController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const staticPath = path.join(__dirname, "../../public");

// Rutas de autenticación
router.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(staticPath, "register.html"));
});

// API Auth
router.post("/api/login", authController.login);
router.post("/api/register", authController.register);
router.post("/api/guest-login", authController.guestLogin);
router.get("/api/verify", authController.verifyToken);
router.post("/api/logout", authController.logout);

// Middleware de errores
router.use((err, req, res, next) => {
  console.error('Error en ruta auth:', err);
  res.status(500).json({ 
    STATUS: "ERROR", 
    ERROR: "Error de autenticación",
    DETAILS: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

export default router;