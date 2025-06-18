import db from "../config/database.js";

export class Maestro {
  static async getAll() {
    try {
      const [maestros] = await db.query(`
          SELECT 
  m.id_maestro,
  m.nombres,
  m.apellidos,
  m.telefono,
  m.correo,
  m.carrera,  -- Código de carrera para el mapeo en frontend
  mat.id_materia,
  mat.nombre_materia  -- Nombre completo de la materia
FROM 
  maestros m
JOIN 
  materias mat ON m.materia = mat.id_materia
ORDER BY 
  m.nombres ASC
      `);
      
      return { 
        STATUS: "OK", 
        DATA: maestros,
        META: {
          count: maestros.length,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error en Maestro.getAll:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener el listado de maestros",
        DETAILS: error.message
      };
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query(`
        SELECT 
          m.*,
          mat.nombre_materia,
          car.nombre AS nombre_carrera
        FROM maestros m
        LEFT JOIN materias mat ON m.materia = mat.id_materia
        LEFT JOIN carreras car ON m.carrera = car.id_carrera
        WHERE m.id_maestro = ?
      `, [id]);
      
      if (!rows[0]) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "Maestro no encontrado"
        };
      }
      
      return { 
        STATUS: "OK", 
        DATA: rows[0] 
      };
    } catch (error) {
      console.error('Error en Maestro.getById:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener el maestro",
        DETAILS: error.message
      };
    }
  }

  static async create(maestro) {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = maestro;
      
      // Validación de campos requeridos
      if (!id_maestro || !nombres || !apellidos || !materia || !carrera) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "Campos requeridos faltantes" 
        };
      }

      const [result] = await db.query(
        "INSERT INTO maestros (id_maestro, nombres, apellidos, materia, carrera, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id_maestro, nombres, apellidos, materia, carrera, telefono, correo]
      );

      return { 
        STATUS: "OK",
        DATA: { ...maestro, id: result.insertId },
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Maestro.create:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al crear maestro",
        DETAILS: error.message,
        CODE: error.code // Código de error de MySQL
      };
    }
  }

  static async update(maestro) {
    try {
      const { id_maestro, ...campos } = maestro;
      
      if (!id_maestro) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "ID de maestro requerido" 
        };
      }

      // Construcción dinámica de la consulta
      const setClauses = [];
      const values = [];
      const camposPermitidos = ['nombres', 'apellidos', 'materia', 'carrera', 'telefono', 'correo'];
      
      camposPermitidos.forEach(campo => {
        if (campos[campo] !== undefined) {
          setClauses.push(`${campo} = ?`);
          values.push(campos[campo]);
        }
      });

      if (setClauses.length === 0) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "No se proporcionaron campos para actualizar" 
        };
      }

      values.push(id_maestro);
      const query = `UPDATE maestros SET ${setClauses.join(', ')} WHERE id_maestro = ?`;
      
      const [result] = await db.query(query, values);

      if (result.affectedRows === 0) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "No se encontró el maestro o no hubo cambios" 
        };
      }

      return { 
        STATUS: "OK",
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Maestro.update:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al actualizar maestro",
        DETAILS: error.message
      };
    }
  }

  static async delete(id) {
    try {
      if (!id) {
        return { 
          STATUS: "INVALID_INPUT",
          ERROR: "ID de maestro requerido" 
        };
      }

      const [result] = await db.query("DELETE FROM maestros WHERE id_maestro = ?", [id]);

      if (result.affectedRows === 0) {
        return { 
          STATUS: "NOT_FOUND",
          ERROR: "No se encontró el maestro para eliminar" 
        };
      }

      return { 
        STATUS: "OK",
        META: {
          affectedRows: result.affectedRows
        }
      };
    } catch (error) {
      console.error('Error en Maestro.delete:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al eliminar maestro",
        DETAILS: error.message
      };
    }
  }

  static async getMaterias() {
    try {
      const [materias] = await db.query('SELECT id_materia, nombre_materia FROM materias');
      return { 
        STATUS: "OK", 
        DATA: materias 
      };
    } catch (error) {
      console.error('Error en Maestro.getMaterias:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener materias",
        DETAILS: error.message
      };
    }
  }

  static async getCarreras() {
    try {
      const [carreras] = await db.query('SELECT id_carrera, nombre FROM carreras');
      return { 
        STATUS: "OK", 
        DATA: carreras 
      };
    } catch (error) {
      console.error('Error en Maestro.getCarreras:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener carreras",
        DETAILS: error.message
      };
    }
  }

  static async getMateriasByMaestro(id_maestro) {
    try {
      const [materias] = await db.query(`
        SELECT m.id_materia, m.nombre_materia 
        FROM materias m
        JOIN maestro_materia mm ON m.id_materia = mm.id_materia
        WHERE mm.id_maestro = ?
      `, [id_maestro]);
      
      return { 
        STATUS: "OK", 
        DATA: materias 
      };
    } catch (error) {
      console.error('Error en Maestro.getMateriasByMaestro:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener materias del maestro",
        DETAILS: error.message
      };
    }
  }

  static async getByCarrera(carrera) {
    try {
      const [maestros] = await db.query(`
        SELECT m.id_maestro, m.nombres, m.apellidos 
        FROM maestros m
        WHERE m.carrera = ?
      `, [carrera]);
      
      return { 
        STATUS: "OK", 
        DATA: maestros 
      };
    } catch (error) {
      console.error('Error en Maestro.getByCarrera:', error);
      return { 
        STATUS: "ERROR",
        ERROR: "Error al obtener maestros por carrera",
        DETAILS: error.message
      };
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
}