const {pool} = require('../db.js');

class Maestro {
  /**
   * Obtener todos los maestros
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
 const [rows] = await pool.query("SELECT * FROM maestros");
        return rows;
      }

  /**
   * Obtener un maestro por su ID
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la consulta
   */
static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM maestros WHERE id_materia = ?", [id]);
    return rows[0];
  }

  /**
   * Crear un nuevo maestro
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(id_maestro,nombres,apellidos,materia,carrera,telefono,correo) {
    const [result] = await pool.query(
      `INSERT INTO maestros (id_maestro,nombres, apellidos, materia, carrera, telefono, correo) 
       VALUES (?,?, ?, ?, ?, ?, ?)`,
      [id_maestro,nombres, apellidos, materia, carrera, telefono, correo]
    );
      return  { id_maestro,nombres,apellidos,materia,carrera,telefono,correo };
    }

  /**
   * Actualizar un maestro existente
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(id_maestro,nombres,apellidos,materia,carrera,telefono,correo) {
    const [result] = await pool.query(
      "UPDATE maestros SET nombres = ?, apellidos = ?, materia = ?, carrera = ?, telefono = ?, correo = ? WHERE id_maestro = ?"
      [
        nombres,apellidos,materia,carrera,telefono,correo,id_maestro
      ]
    );
      return result;
  }

  /**
   * Eliminar un maestro
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_maestro) {
    const [result] = await pool.query(
      "DELETE FROM maestro WHERE id_maestro = ?",
      [id_maestro]
    );
    return result;
  }

  /**
   * Obtener todas las materias (para el select)
   * @returns {Promise<Array>} Lista de materias
   */
  static async getMateriasPorMaestro() {
    const [result] = await pool.query( 
    "select materias.id_materia, materias.nombre_materia, nombres from materias join maestros ON materias.id_materia = maestros.materia"
    );
    return result;
  }
}

module.exports = Maestro
