const {pool} = require('../db.js');

class Materia {
  /**
   * Obtener todas las materias
   * @returns {Promise<Object>} Resultado de la consulta
   */
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM materias");
        return rows;
      }


  /**
   * Obtener una materia por su ID
   * @param {string} id_materia - ID de la materia
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM materias WHERE id_materia = ?", [id]);
    return rows[0];
  }

  /**
   * Crear una nueva materia
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(nombre_materia) {
    const [result] = await pool.query(
      "INSERT INTO materias (nombre_materia) VALUES (?)",
      [nombre_materia]
    );
    return { id_materia: result.insertId, nombre_materia };
  }

  /**
   * Actualizar una materia existente
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(id_materia, nombre_materia) {
    const [result] = await pool.query(
      "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?",
      [nombre_materia, id_materia]
    );
    return result;
  }

  /**
   * Eliminar una materia
   * @param {string} nombre_materia- Nombre de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_materia) {
    const [result] = await pool.query(
      "DELETE FROM materias WHERE id_materia = ?",
      [id_materia]
    );
    return result;
  }
}

module.exports = Materia;
