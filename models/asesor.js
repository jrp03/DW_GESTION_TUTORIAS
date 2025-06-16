import db from "../config/database.js";

export class Asesor {
   static async getAll() {
    try {
      const [data] = await db.query("SELECT * FROM alumnos");
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM alumnos WHERE id_alumno = ?", [id]);
      return { success: true, data: rows[0] || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async create(asesor) {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = asesor;
      await db.query(
        "INSERT INTO alumnos (id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia]
      );
      return { success: true, data: asesor };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async update(asesor) {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = asesor;
      await db.query(
        "UPDATE alumnos SET nombre = ?, apellido = ?, telefono = ?, correo = ?, maestro = ?, carrera = ?, materia = ? WHERE id_alumno = ?",
        [nombre, apellido, telefono, correo, maestro, carrera, materia, id_alumno]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM alumnos WHERE id_alumno = ?", [id]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  
  static async getMateriasAlumno() {
    try {
      const [data] = await db.query(
        "SELECT id_alumno, materias.id_materia, materias.nombre_materia FROM materias JOIN alumnos ON materias.id_materia = alumnos.materia"
      );
      return { success: true, data };
    }
    catch (error) {
      return { success: false, error: error.message };
    }
  }


  //static async getMaestros() {
  //  const result = await db.query(
  //    'SELECT id_maestro, nombres, apellidos FROM maestros'
  //  );
  //  return result.success ? result.data : [];
  //}
  static async getMaestrosAlumno() {
    try {
      const [data] = await db.query(
        "SELECT id_alumno, maestros.id_maestro, maestros.nombres FROM maestros JOIN alumnos ON maestros.id_maestro = alumnos.maestro"
      );
      return { success: true, data };
    }
    catch (error) {
      return { success: false, error: error.message };
    }
  }
}