<<<<<<< HEAD
const Database = require('../db.js');
=======
const {pool} = require('../db.js');
>>>>>>> prueba-validacion

class Maestro {
  /**
   * Obtener todos los maestros
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getAll() {
<<<<<<< HEAD
    const db = Database.getInstance()
    const sql = "SELECT * FROM maestros"
    return await db.get_data(sql)
  }
=======
 const [rows] = await pool.query("SELECT * FROM maestros");
        return rows;
      }
>>>>>>> prueba-validacion

  /**
   * Obtener un maestro por su ID
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getById(id_maestro) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM maestros WHERE id_maestro = ?"
    return await db.get_data(sql, [id_maestro])
=======
static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM maestros WHERE id_materia = ?", [id]);
    return rows[0];
>>>>>>> prueba-validacion
  }

  /**
   * Crear un nuevo maestro
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async create(maestro) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO maestros (id_maestro, nombres, apellidos, materia, carrera, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      maestro.id_maestro,
      maestro.nombres,
      maestro.apellidos,
      maestro.materia,
      maestro.carrera,
      maestro.telefono,
      maestro.correo,
    ])
  }
=======
  static async create(id_maestro,nombres,apellidos,materia,carrera,telefono,correo) {
    const [result] = await pool.query(
      `INSERT INTO maestros (id_maestro,nombres, apellidos, materia, carrera, telefono, correo) 
       VALUES (?,?, ?, ?, ?, ?, ?)`,
      [id_maestro,nombres, apellidos, materia, carrera, telefono, correo]
    );
      return  { id_maestro,nombres,apellidos,materia,carrera,telefono,correo };
    }
>>>>>>> prueba-validacion

  /**
   * Actualizar un maestro existente
   * @param {Object} maestro - Datos del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async update(maestro) {
    const db = Database.getInstance()
    const sql =
      "UPDATE maestros SET nombres = ?, apellidos = ?, materia = ?, carrera = ?, telefono = ?, correo = ? WHERE id_maestro = ?"
    return await db.exec(sql, [
      maestro.nombres,
      maestro.apellidos,
      maestro.materia,
      maestro.carrera,
      maestro.telefono,
      maestro.correo,
      maestro.id_maestro,
    ])
=======
  static async update(id_maestro,nombres,apellidos,materia,carrera,telefono,correo) {
    const [result] = await pool.query(
      "UPDATE maestros SET nombres = ?, apellidos = ?, materia = ?, carrera = ?, telefono = ?, correo = ? WHERE id_maestro = ?"
      [
        nombres,apellidos,materia,carrera,telefono,correo,id_maestro
      ]
    );
      return result;
>>>>>>> prueba-validacion
  }

  /**
   * Eliminar un maestro
   * @param {string} id_maestro - ID del maestro
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_maestro) {
<<<<<<< HEAD
    const db = Database.getInstance()
    const sql = "DELETE FROM maestros WHERE id_maestro = ?"
    return await db.exec(sql, [id_maestro])
=======
    const [result] = await pool.query(
      "DELETE FROM maestro WHERE id_maestro = ?",
      [id_maestro]
    );
    return result;
>>>>>>> prueba-validacion
  }

  /**
   * Obtener todas las materias (para el select)
   * @returns {Promise<Array>} Lista de materias
   */
<<<<<<< HEAD
  static async getMaterias() {
    const db = Database.getInstance()
    const sql = "SELECT id_materia, nombre_materia FROM materias"
    const result = await db.get_data(sql)
    return result.DATA
=======
  static async getMateriasPorMaestro() {
    const [result] = await pool.query( 
    "select materias.id_materia, materias.nombre_materia, nombres from materias join maestros ON materias.id_materia = maestros.materia"
    );
    return result;
>>>>>>> prueba-validacion
  }
}

module.exports = Maestro
