import db from "../config/database.js";

export class Master {
  static async getMaestros() {
    const result = await db.query('SELECT id_maestro, nombres, apellidos FROM maestros');
    return result.success ? result.data : [];
  }

  static async getMaterias() {
    const result = await db.query('SELECT id_materia, nombre_materia FROM materias');
    return result.success ? result.data : [];
  }

  static async getAsesores() {
    const result = await db.query('SELECT id_alumno, nombre FROM alumnos WHERE nombre IS NOT NULL');
    return result.success ? 
      result.data.map(a => ({ id_alumno: a.id_alumno, nombre_asesor: a.nombre })) : 
      [];
  }

  static async getSolicitudes() {
    const result = await db.query('SELECT id_alumno, nombres, apellidos FROM solicitud');
    return result.success ? result.data : [];
  }

  static async buscarAvanzada({ materia, maestro, asesor }) {
    let sql = "";
    let params = {};

    if (materia) {
      sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
             FROM alumnos
             INNER JOIN maestros ON alumnos.materia = maestros.materia
             INNER JOIN materias ON alumnos.materia = materias.id_materia
             WHERE materias.id_materia = @materia`;
      params = { materia };
    } else if (maestro) {
      sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
             FROM alumnos
             INNER JOIN maestros ON alumnos.materia = maestros.materia
             INNER JOIN materias ON alumnos.materia = materias.id_materia
             WHERE maestros.id_maestro = @maestro`;
      params = { maestro };
    } else if (asesor) {
      sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
             FROM alumnos
             INNER JOIN maestros ON alumnos.materia = maestros.materia
             INNER JOIN materias ON alumnos.materia = materias.id_materia
             WHERE alumnos.id_alumno = @asesor`;
      params = { asesor };
    }

    if (!sql) {
      return {
        success: false,
        error: "No se proporcionaron parámetros de búsqueda válidos",
        data: []
      };
    }

    return await db.query(sql, params);
  }
}