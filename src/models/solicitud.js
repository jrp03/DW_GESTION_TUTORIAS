<<<<<<< HEAD
const Database = require('../db.js');
=======
const {pool} = require('../db.js');
>>>>>>> prueba-validacion

class Solicitud {
  /**
   * Obtener todas las solicitudes
   * @returns {Promise<Object>} Resultado de la consulta
   */
<<<<<<< HEAD
  static async getAll() {
    const db = Database.getInstance()
    const sql = "SELECT * FROM solicitud"
    return await db.get_data(sql)
  }

  /**
   * Obtener una solicitud por su ID
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id_alumno) {
    const db = Database.getInstance()
    const sql = "SELECT * FROM solicitud WHERE id_alumno = ?"
    return await db.get_data(sql, [id_alumno])
=======
static async getAll() {
        const [rows] = await pool.query("SELECT * FROM solicitud");
        return rows;
      }

  /**
   * Obtener una solicitud por su ID
   * @param {string} id_solicitud - ID de solicitud
   * @returns {Promise<Object>} Resultado de la consulta
   */
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM solicitud WHERE id_solicitud = ?", [id]);
    return rows[0];
>>>>>>> prueba-validacion
  }

  /**
   * Crear una nueva solicitud
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async create(solicitud) {
    const db = Database.getInstance()
    const sql =
      "INSERT INTO solicitud (id_alumno, nombres, apellidos, carrera, asesor, materia) VALUES (?, ?, ?, ?, ?, ?)"
    return await db.exec(sql, [
      solicitud.id_alumno,
      solicitud.nombres,
      solicitud.apellidos,
      solicitud.carrera,
      solicitud.asesor,
      solicitud.materia,
    ])
=======
  static async create(id_alumno, nombres, apellidos, carrera, asesor, materia) {
    const [result] = await pool.query(
      "INSERT INTO solicitud (id_alumno, nombres, apellidos, carrera, asesor, materia) VALUES (?, ?, ?, ?, ?, ?)"
      [id_alumno, nombres, apellidos, carrera, asesor, materia]
    );
      return { id_solicitud: result.insertId,id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia };
>>>>>>> prueba-validacion
  }

  /**
   * Actualizar una solicitud existente
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async update(solicitud) {
    const db = Database.getInstance()
    const sql =
      "UPDATE solicitud SET nombres = ?, apellidos = ?, carrera = ?, asesor = ?, materia = ? WHERE id_alumno = ?"
    return await db.exec(sql, [
      solicitud.nombres,
      solicitud.apellidos,
      solicitud.carrera,
      solicitud.asesor,
      solicitud.materia,
      solicitud.id_alumno,
    ])
=======
  static async update( nombres, apellidos, carrera, asesor, materia, id_alumno) {
    const [result] = await pool.query(
      "UPDATE solicitud SET nombres = ?, apellidos = ?, carrera = ?, asesor = ?, materia = ? WHERE id_alumno = ?"
    [ nombres, apellidos, carrera, asesor, materia, id_alumno ]
    );
      return result;
>>>>>>> prueba-validacion
  }

  /**
   * Eliminar una solicitud
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
<<<<<<< HEAD
  static async delete(id_alumno) {
    const db = Database.getInstance()
    const sql = "DELETE FROM solicitud WHERE id_alumno = ?"
    return await db.exec(sql, [id_alumno])
=======
  static async delete(id_solicitud) {
    const [result] = await pool.query(
      "DELETE FROM solicitud WHERE id_solicitud = ?"
    [id_solicitud]
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
  static async solicitudMateria() {
const [result] = await pool.query( 
  "select count(id_solicitud) as Num_solicitudes, materia from solicitud group by materia"
   );
    return result;
>>>>>>> prueba-validacion
  }

  /**
   * Obtener todos los asesores (para el select)
   * @returns {Promise<Array>} Lista de asesores
   */
<<<<<<< HEAD
  static async getAsesores() {
    const db = Database.getInstance()
    const sql = "SELECT id_alumno, nombre FROM alumnos WHERE nombre IS NOT NULL"
    const result = await db.get_data(sql)

    // Transformar los datos para mantener la misma estructura que en PHP
    return result.DATA.map((asesor) => ({
      id_alumno: asesor.id_alumno,
      nombre_asesor: asesor.nombre,
    }))
  }
=======
  static async solicitudesAsesor() {
 const [result] = await pool.query( 
  "select count(id_solicitud) as Num_solicitudes, id_alumno from solicitud group by id_alumno"
   );
    return result;
  }

>>>>>>> prueba-validacion
}

module.exports = Solicitud;
