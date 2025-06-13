<<<<<<< HEAD
const Database = require('../db.js');
=======
const {pool} = require('../db.js');
>>>>>>> prueba-validacion

class Materia {
  /**
   * Obtener todas las materias
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM materias"
    return await db.get_data(sql)
  }
=======
    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM materias");
        return rows;
      }

>>>>>>> prueba-validacion

  /**
   * Obtener una materia por su ID
   * @param {string} id_materia - ID de la materia
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getById(id_materia) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM materias WHERE id_materia = ?"
    return await db.get_data(sql, [id_materia])
=======
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM materias WHERE id_materia = ?", [id]);
    return rows[0];
>>>>>>> prueba-validacion
  }

  /**
   * Crear una nueva materia
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async create(materia) {
    const db = Database.getInstance()
    const sql = "INSERT INTO materias (id_materia, nombre_materia) VALUES (?, ?)"
    return await db.exec(sql, [materia.id_materia, materia.nombre_materia])
=======
  static async create(nombre_materia) {
    const [result] = await pool.query(
      "INSERT INTO materias (nombre_materia) VALUES (?)",
      [nombre_materia]
    );
    return { id_materia: result.insertId, nombre_materia };
>>>>>>> prueba-validacion
  }

  /**
   * Actualizar una materia existente
   * @param {Object} materia - Datos de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async update(materia) {
    const db = Database.getInstance()
    // Corregido el nombre de la tabla de "mateias" a "materias"
    const sql = "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?"
    return await db.exec(sql, [materia.nombre_materia, materia.id_materia])
=======
  static async update(id_materia, nombre_materia) {
    const [result] = await pool.query(
      "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?",
      [nombre_materia, id_materia]
    );
    return result;
>>>>>>> prueba-validacion
  }

  /**
   * Eliminar una materia
<<<<<<< HEAD
   * @param {string} id_materia - ID de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_materia) {
    const db = Database.getInstance()
    const sql = "DELETE FROM materias WHERE id_materia = ?"
    return await db.exec(sql, [id_materia])
=======
   * @param {string} nombre_materia- Nombre de la materia
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_materia) {
    const [result] = await pool.query(
      "DELETE FROM materias WHERE id_materia = ?",
      [id_materia]
    );
    return result;
>>>>>>> prueba-validacion
  }
}

module.exports = Materia;
