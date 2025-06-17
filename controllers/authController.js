import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal";

export const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Usuario y contraseña requeridos" });
      }

      const usuario = await Usuario.verificarCredenciales(username, password);
      if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { id: usuario.id, username: usuario.username, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({
        token,
        user: {
          id: usuario.id,
          username: usuario.username,
          nombre: usuario.nombre,
          role: usuario.rol
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { username, password, nombre, rol } = req.body;
      
      if (!username || !password || !nombre) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const usuarioExistente = await Usuario.getByUsername(username);
      if (usuarioExistente.data?.length > 0) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      const result = await Usuario.create({ username, password, nombre, rol });
      if (result.success) {
        res.status(201).json({ message: "Usuario registrado" });
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verifyToken: (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ STATUS: "OK", usuario: decoded });
    } catch (error) {
      res.status(401).json({ STATUS: "ERROR", error: "Token inválido" });
    }
  },

  guestLogin: async (req, res) => {
    try {
      const guestUser = {
        id: 'guest_' + Date.now(),
        username: 'invitado',
        nombre: 'Usuario Demo',
        rol: 'invitado',
        permisos: ['lectura']
      };

      const token = jwt.sign(
        { user: guestUser },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({
        STATUS: "OK",
        token,
        usuario: guestUser
      });
    } catch (error) {
      res.status(500).json({ 
        STATUS: "ERROR",
        error: "Error en acceso demo" 
      });
    }
  },

  logout: (req, res) => {
    res.json({ STATUS: "OK", message: "Sesión cerrada" });
  }
};
