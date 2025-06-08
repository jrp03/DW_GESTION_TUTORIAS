const {pool} = require('../db.js');

class Solicitud {
  /**
   * Obtener todas las solicitudes
   * @returns {Promise<Object>} Resultado de la consulta
   */
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
  }

  /**
   * Crear una nueva solicitud
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async create(id_alumno, nombres, apellidos, carrera, asesor, materia) {
    const [result] = await pool.query(
      "INSERT INTO solicitud (id_alumno, nombres, apellidos, carrera, asesor, materia) VALUES (?, ?, ?, ?, ?, ?)"
      [id_alumno, nombres, apellidos, carrera, asesor, materia]
    );
      return { id_solicitud: result.insertId,id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia };
  }

  /**
   * Actualizar una solicitud existente
   * @param {Object} solicitud - Datos de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update( nombres, apellidos, carrera, asesor, materia, id_alumno) {
    const [result] = await pool.query(
      "UPDATE solicitud SET nombres = ?, apellidos = ?, carrera = ?, asesor = ?, materia = ? WHERE id_alumno = ?"
    [ nombres, apellidos, carrera, asesor, materia, id_alumno ]
    );
      return result;
  }

  /**
   * Eliminar una solicitud
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_solicitud) {
    const [result] = await pool.query(
      "DELETE FROM solicitud WHERE id_solicitud = ?"
    [id_solicitud]
    );
    return result;
  }

  /**
   * Obtener todas las materias (para el select)
   * @returns {Promise<Array>} Lista de materias
   */
  static async solicitudMateria() {
const [result] = await pool.query( 
  "select count(id_solicitud) as Num_solicitudes, materia from solicitud group by materia"
   );
    return result;
  }

  /**
   * Obtener todos los asesores (para el select)
   * @returns {Promise<Array>} Lista de asesores
   */
  static async solicitudesAsesor() {
 const [result] = await pool.query( 
  "select count(id_solicitud) as Num_solicitudes, id_alumno from solicitud group by id_alumno"
   );
    return result;
  }

}

module.exports = Solicitud;
