import db from "../config/database.js";

export class Master {
  
  static async getMaestros() {
    try {
      const [rows] = await db.query('SELECT id_maestro, nombres, apellidos FROM maestros');
      return rows;
    } catch (error) {
      console.error("Error en getMaestros:", error);
      throw error;
    }
  }

  
  static async getMaterias() {
    try {
      const [rows] = await db.query('SELECT id_materia, nombre_materia FROM materias');
      return rows;
    } catch (error) {
      console.error("Error en getMaterias:", error);
      throw error;
    }
  }

 
  static async getAsesores() {
    try {
      const [rows] = await db.query('SELECT id_alumno, nombre FROM alumnos WHERE nombre IS NOT NULL');
      return rows.map(a => ({ 
        id_alumno: a.id_alumno, 
        nombre_asesor: a.nombre 
      }));
    } catch (error) {
      console.error("Error en getAsesores:", error);
      throw error;
    }
  }

 
  static async getSolicitudes() {
    try {
      const [rows] = await db.query('SELECT id_alumno, nombres, apellidos FROM solicitud');
      return rows;
    } catch (error) {
      console.error("Error en getSolicitudes:", error);
      throw error;
    }
  }

 
  static async buscarAvanzada({ materia, maestro, asesor }) {
    try {
      let sql = "";
      let params = [];

      if (materia) {
        sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
               FROM alumnos
               INNER JOIN maestros ON alumnos.materia = maestros.materia
               INNER JOIN materias ON alumnos.materia = materias.id_materia
               WHERE materias.id_materia = ?`;
        params = [materia];
      } else if (maestro) {
        sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
               FROM alumnos
               INNER JOIN maestros ON alumnos.materia = maestros.materia
               INNER JOIN materias ON alumnos.materia = materias.id_materia
               WHERE maestros.id_maestro = ?`;
        params = [maestro];
      } else if (asesor) {
        sql = `SELECT alumnos.nombre, maestros.nombres AS maestro, materias.nombre_materia
               FROM alumnos
               INNER JOIN maestros ON alumnos.materia = maestros.materia
               INNER JOIN materias ON alumnos.materia = materias.id_materia
               WHERE alumnos.id_alumno = ?`;
        params = [asesor];
      }

      if (!sql) {
        return {
          success: false,
          error: "No se proporcionaron parámetros de búsqueda válidos",
          data: []
        };
      }

      const [rows] = await db.query(sql, params);
      return { success: true, data: rows };
    } catch (error) {
      console.error("Error en buscarAvanzada:", error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }
}