import bcrypt from "bcryptjs";
import db from "../config/database.js";

export class Usuario {
  /**
   * Obtener usuario por nombre de usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
   */
  static async getByUsername(username) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE username = ?',
        [username]
      );
      return { success: true, data: rows };
    } catch (error) {
      console.error("Error en Usuario.getByUsername:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Crear nuevo usuario
   * @param {Object} usuario - Datos del usuario
   * @param {string} usuario.username - Nombre de usuario
   * @param {string} usuario.password - Contraseña
   * @param {string} usuario.nombre - Nombre completo
   * @param {string} [usuario.rol] - Rol del usuario (opcional)
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  static async create(usuario) {
    try {
      const hashedPassword = await bcrypt.hash(usuario.password, 10);
      
      await db.query(
        'INSERT INTO usuarios (username, password, nombre, rol) VALUES (?, ?, ?, ?)',
        [
          usuario.username,
          hashedPassword,
          usuario.nombre,
          usuario.rol || 'usuario'
        ]
      );
      return { success: true };
    } catch (error) {
      console.error("Error en Usuario.create:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Verificar credenciales de usuario
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Promise<Object|null>} Datos del usuario sin contraseña o null si no es válido
   */
  static async verificarCredenciales(username, password) {
    try {
      const result = await this.getByUsername(username);
      
      if (!result.success || result.data.length === 0) return null;
      
      const usuario = result.data[0];
      const valido = await bcrypt.compare(password, usuario.password);
      
      if (!valido) return null;
      
      // Eliminar la contraseña antes de devolver el objeto
      const { password: _, ...usuarioSinPassword } = usuario;
      return usuarioSinPassword;
    } catch (error) {
      console.error("Error en Usuario.verificarCredenciales:", error);
      return null;
    }
  }
}