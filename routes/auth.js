import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const staticPath = path.join(__dirname, "../../public");




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