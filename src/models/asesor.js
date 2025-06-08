const {pool} = require('../db.js');

class Asesor {
  /**
   * Obtener todos los asesores (alumnos)
   * @returns {Promise<Object>} Resultado de la consulta
   */
 static async getAll() {
        const [rows] = await pool.query("SELECT * FROM alumnos");
        return rows;
      }

  /**
   * Obtener un asesor por su ID
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la consulta
   */
    static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM alumno WHERE id_alumno = ?", [id]);
    return rows[0];
  }

  /**
   * Crear un nuevo asesor
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
   static async create(id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) {
    const [result] = await pool.query(
      "INSERT INTO alumnos (id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      [id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia]
      );
      return { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia };
  }

  /**
   * Actualizar un asesor existente
   * @param {Object} asesor - Datos del asesor
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async update(id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia) {
    const [result] = await pool.query(
      "UPDATE alumnos SET nombre = ?, apellido = ?, telefono = ?, correo = ?, maestro = ?, carrera = ?, materia = ? WHERE id_alumno = ?"
      [nombre, apellido, telefono, correo, maestro, carrera, materia, id_alumno]
    );
      return result;
  }

  /**
   * Eliminar un asesor
   * @param {string} id_alumno - ID del alumno
   * @returns {Promise<Object>} Resultado de la operación
   */
  static async delete(id_alumno) {
    const [result] = await pool.query(
       "DELETE FROM alumnos WHERE id_alumno = ?",
      [id_alumno]
      );
    return result;
  }

  /**
   * Obtener todas las materias (para el select)
   * @returns {Promise<Array>} Lista de materias
   */
  static async getMateriasAlumno() {
    const [result] = await pool.query( 
    "select id_alumno, materias.id_materia, materias.nombre_materia from materias join alumnos  ON materias.id_materia = alumnos.materia;"
    );
    return result;
  }
  

  /**
   * Obtener todos los maestros (para el select)
   * @returns {Promise<Array>} Lista de maestros
   */
  static async getMaestrosAlumno() {
     const [result] = await pool.query( 
    "select id_alumno, maestros.id_maestro, maestros.nombres from maestros join alumnos  ON maestros.id_maestro = alumnos.materia"
    );
    return result;
  }
}

module.exports = Asesor;
