const express = require('express');
const authController = require('../controllers/authController');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

// Rutas para la autenticación
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/verificar", verificarToken, authController.verificarToken);

module.exports = router;
