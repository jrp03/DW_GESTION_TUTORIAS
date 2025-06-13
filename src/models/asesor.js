<<<<<<< HEAD
const Database = require('../db.js');
=======
const {pool} = require('../db.js');
>>>>>>> prueba-validacion

class Asesor {
  /**
   * Obtener todos los asesores (alumnos)
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM alumnos"
    return await db.get_data(sql)
  }
=======
 static async getAll() {
        const [rows] = await pool.query("SELECT * FROM alumnos");
        return rows;
      }
>>>>>>> prueba-validacion

  /**
   * Obtener un asesor por su ID
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getById(id_alumno) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM alumnos WHERE id_alumno = ?"
    return await db.get_data(sql, [id_alumno])
=======
    static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM alumno WHERE id_alumno = ?", [id]);
    return rows[0];
>>>>>>> prueba-validacion
  }

  /**
   * Crear un nuevo asesor
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async create(asesor) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO alumnos (id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      asesor.id_alumno,
      asesor.nombre,
      asesor.apellido,
      asesor.telefono,
      asesor.correo,
      asesor.maestro,
      asesor.carrera,
      asesor.materia,
    ])
=======
   static async create(id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) {
    const [result] = await pool.query(
      "INSERT INTO alumnos (id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      [id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia]
      );
      return { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia };
>>>>>>> prueba-validacion
  }

  /**
   * Actualizar un asesor existente
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async update(asesor) {
    const db = Database.getInstance()
    const sql =
      "UPDATE alumnos SET nombre = ?, apellido = ?, telefono = ?, correo = ?, maestro = ?, carrera = ?, materia = ? WHERE id_alumno = ?"
    return await db.exec(sql, [
      asesor.nombre,
      asesor.apellido,
      asesor.telefono,
      asesor.correo,
      asesor.maestro,
      asesor.carrera,
      asesor.materia,
      asesor.id_alumno,
    ])
=======
  static async update(id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) {
    const [result] = await pool.query(
      "UPDATE alumnos SET nombre = ?, apellido = ?, telefono = ?, correo = ?, maestro = ?, carrera = ?, materia = ? WHERE id_alumno = ?"
      [nombre, apellido, telefono, correo, maestro, carrera, materia, id_alumno]
    );
      return result;
>>>>>>> prueba-validacion
  }

  /**
   * Eliminar un asesor
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_alumno) {
<<<<<<< HEAD
    const db = Database.getInstance()
    const sql = "DELETE FROM alumnos WHERE id_alumno = ?"
    return await db.exec(sql, [id_alumno])
=======
    const [result] = await pool.query(
       "DELETE FROM alumnos WHERE id_alumno = ?",
      [id_alumno]
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
  }
=======
  static async getMateriasAlumno() {
    const [result] = await pool.query( 
    "select id_alumno, materias.id_materia, materias.nombre_materia from materias join alumnos  ON materias.id_materia = alumnos.materia;"
    );
    return result;
  }
  
>>>>>>> prueba-validacion

  /**
   * Obtener todos los maestros (para el select)
   * @returns {Promise<Array>} Lista de maestros
   */
<<<<<<< HEAD
  static async getMaestros() {
    const db = Database.getInstance()
    const sql = "SELECT id_maestro, nombres, apellidos FROM maestros"
    const result = await db.get_data(sql)
    return result.DATA
=======
  static async getMaestrosAlumno() {
     const [result] = await pool.query( 
    "select id_alumno, maestros.id_maestro, maestros.nombres from maestros join alumnos  ON maestros.id_maestro = alumnos.materia"
    );
    return result;
>>>>>>> prueba-validacion
  }
}

module.exports = Asesor;
