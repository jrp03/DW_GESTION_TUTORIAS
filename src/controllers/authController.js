const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal"

// Controlador para la autenticación
const authController = {
  /**
   * Iniciar sesión
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, proporciona nombre de usuario y contraseña.",
        })
      }
      // Verificar si el usuario ya existe
      const usuario = await Usuario.verificarCredenciales(username, password)

      if (!usuario) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "Credenciales inválidas.",
        })
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.id, 
          username: usuario.username, 
          rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: "8h" }, // El token expira en 8 horas
      )

      res.json({
        STATUS: "OK",
        DATA: {
          token,
          usuario: {
            id: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre,
            rol: usuario.rol,
          },
        },
      })
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor.",
      });
    }
  },

  /**
   * Registrar un nuevo usuario
   */
 async register(req, res) {
    try {
      const { username, password, nombre, rol } = req.body;

      if (!username || !password || !nombre) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, completa todos los campos requeridos.",
        })
      }

      // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.getByUsername(username);
     if (usuarioExistente) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "El nombre de usuario ya está en uso.",
        });
      }

      // Crear el nuevo usuario
       const nuevoUsuario = await Usuario.create(username, password, nombre, rol);

         return res.status(201).json({
        STATUS: "OK",
        MESSAGE: "Usuario creado correctamente.",
        DATA: {
          id: nuevoUsuario.id,
          username: nuevoUsuario.username,
          nombre: nuevoUsuario.nombre,
          rol: nuevoUsuario.rol,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error al crear el usuario.",
      });
    }
  },
  /**
   * Verificar el token JWT
   */
  async verificarToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "No se proporcionó token válido.",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      res.json({
        STATUS: "OK",
        DATA: {
          usuario: decoded,
        },
      });
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        STATUS: "ERROR",
        ERROR: "Token inválido o expirado.",
      });
    }
  }
}
module.exports = authController;
