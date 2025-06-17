import db from "../config/database.js";

export class Asesor {
   static async getAll() {
    try {
        const [alumnos] = await db.query(`
            SELECT 
                a.id_alumno,
                a.nombre,
                a.apellido,
                a.telefono,
                a.correo,
                CONCAT(m.nombres, ' ', m.apellidos) AS nombre_maestro,
                a.carrera,
                mat.nombre_materia
            FROM 
                alumnos a
            LEFT JOIN 
                maestros m ON a.maestro = m.id_maestro
            LEFT JOIN 
                materias mat ON a.materia = mat.id_materia
            ORDER BY 
                a.nombre ASC
        `);
        
        return { 
            STATUS: "OK", 
            DATA: alumnos,
            META: {
                count: alumnos.length,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error en Asesor.getAll:', error);
        return { 
            STATUS: "ERROR",
            ERROR: "Error al obtener el listado de asesores",
            DETAILS: error.message
        };
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


  static async getMaestros() {
  try {
    const [maestros] = await db.query(
      'SELECT id_maestro, nombres, apellidos FROM maestros'
    );
    if (!maestros) {
            return { STATUS: "ERROR", ERROR: "No hay materias registradas" };
        }
        return { STATUS: "OK", DATA: maestros };
    } catch (error) {
        return { STATUS: "ERROR", ERROR: error.message };
    }
}

static async getMaterias() {
    try {
        const [materias] = await db.query('SELECT id_materia, nombre_materia FROM materias');
        if (!materias) {
            return { STATUS: "ERROR", ERROR: "No hay materias registradas" };
        }
        return { STATUS: "OK", DATA: materias };
    } catch (error) {
        return { STATUS: "ERROR", ERROR: error.message };
    }
}


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