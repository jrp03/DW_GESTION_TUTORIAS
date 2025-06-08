const {pool} = require('../db.js'); // Conexion base de datos
const bcrypt = require('bcrypt'); // Permite encriptar contraseña

class Usuario {
    /**
   * Obtener un usuario por su nombre de usuario
   * @param {string} username - Nombre de usuario
   * @returns {Promise<Object|null>} Usuario encontrado o null
   */
  static async getByUsername(username) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE username = ?",
        [username]
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

   /**
   * Obtener un usuario por id
   * @param {interget} id - id de usuario
   * @returns {Promise<Object|null>} Usuario encontrado o null
   */
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id]
      );
      return rows.length > 0 ? rows[0] : null;

    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo usuario
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña en texto plano
   * @param {string} nombre - Nombre del usuario
   * @param {string} [rol='usuario'] - Rol del usuario
   * @returns {Promise<Object>} Usuario creado (sin contraseña)
   */
  static async create(username, password, nombre, rol = 'usuario') {
    try {
      // Verificar si ya existe el usuario
      const existingUser = await this.getByUsername(username);
      if (existingUser) {
        throw new Error(`El nombre de usuario "${username}" ya está en uso.`);
      }

      // Insertar nuevo usuario
      const [result] = await pool.query(
        "INSERT INTO usuarios (username, password, nombre, rol) VALUES (?, ?, ?, ?)",
        [username, password, nombre, rol]
      );
      
      return {
        id: result.insertId,
        username,
        nombre,
        rol
      };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  /**
 * Verificar si las credenciales son válidas
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<Object|null>} Usuario si las credenciales son válidas, null en caso contrario
 */
static async verificarCredenciales(username, password) {
  try {
    const usuario = await this.getByUsername(username);

    if (!usuario) {
      // return null; // Usuario no encontrado
      return false;
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      // return null; // Contraseña incorrecta
      return false;
    }

    // No devolver la contraseña
    delete usuario.password;

    //return usuario;
    return true; // Credenciales válidas

  } catch (error) {
    console.error('Error al verificar credenciales:', error);
    throw error;
  }
}

static async encripPassword (password) {
  // Encriptar la contraseña 
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword
    }

}


module.exports = Usuario;

