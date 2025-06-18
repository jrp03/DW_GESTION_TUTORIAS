import db from "../config/database.js";


export class Materia {
  static async getAll() {
    try {
      const [materias] = await db.query(`
        SELECT 
          id_materia,
          nombre_materia
        FROM 
          materias
        ORDER BY 
          nombre_materia ASC
      `);
      
      return { 
        STATUS: "OK", 
        DATA: materias,
        META: {
          count: materias.length,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error en Materia.getAll:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener el listado de materias",
        DETAILS: error.message
      };
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM materias WHERE id_materia = ?", 
        [id]
      );
      
      if (!rows[0]) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "Materia no encontrada"
        };
      }
      
      return { 
        STATUS: "OK", 
        DATA: rows[0] 
      };
    } catch (error) {
      console.error('Error en Materia.getById:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener la materia",
        DETAILS: error.message
      };
    }
  }

  static async create({ id_materia, nombre_materia }) {
    try {
      // Validación de campos requeridos
      if (!id_materia || !nombre_materia) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "ID y nombre de materia son requeridos" 
        };
      }

      const [result] = await db.query(
        "INSERT INTO materias (id_materia, nombre_materia) VALUES (?, ?)",
        [id_materia, nombre_materia]
      );

      return { 
        STATUS: "OK",
        DATA: { id_materia, nombre_materia },
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Materia.create:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al crear materia",
        DETAILS: error.message,
        CODE: error.code // Código de error de MySQL
      };
    }
  }

  static async update(id, { nombre_materia }) {
    try {
      if (!id || !nombre_materia) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "ID y nombre de materia son requeridos" 
        };
      }

      const [result] = await db.query(
        "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?",
        [nombre_materia, id]
      );

      if (result.affectedRows === 0) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "No se encontró la materia o no hubo cambios" 
        };
      }

      return { 
        STATUS: "OK",
        DATA: { id_materia: id, nombre_materia },
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Materia.update:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al actualizar materia",
        DETAILS: error.message
      };
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "ID de materia requerido" 
        };
      }

      const [result] = await db.query(
        "DELETE FROM materias WHERE id_materia = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "No se encontró la materia para eliminar" 
        };
      }

      return { 
        STATUS: "OK",
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Materia.delete:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al eliminar materia",
        DETAILS: error.message
      };
    }
  }

  static async getByCarrera(carrera) {
    try {
      const [materias] = await db.query(
        `SELECT m.* 
         FROM materias m 
         JOIN carrera_materia cm ON m.id_materia = cm.id_materia 
         WHERE cm.carrera = ?`,
        [carrera]
      );
      
      return { 
        STATUS: "OK", 
        DATA: materias,
        META: {
          count: materias.length
        }
      };
    } catch (error) {
      console.error('Error en Materia.getByCarrera:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener materias por carrera",
        DETAILS: error.message
      };
    }
  }

  static async getByMaestro(idMaestro) {
    try {
      const [materias] = await db.query(
        `SELECT m.* 
         FROM materias m 
         JOIN maestro_materia mm ON m.id_materia = mm.id_materia 
         WHERE mm.id_maestro = ?`,
        [idMaestro]
      );
      
      return { 
        STATUS: "OK", 
        DATA: materias,
        META: {
          count: materias.length
        }
      };
    } catch (error) {
      console.error('Error en Materia.getByMaestro:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener materias por maestro",
        DETAILS: error.message
      };
    }
  }
}