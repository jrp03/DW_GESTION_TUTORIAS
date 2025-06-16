import db from "../config/database.js";

export class Maestro {
  
  static async getAll() {
    try {
      const [data] = await db.query('SELECT * FROM maestros');
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async getById(id_maestro) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM maestros WHERE id_maestro = ?', 
        [id_maestro]
      );
      return { success: true, data: rows[0] || null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async create(maestro) {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = maestro;
      await db.query(
        `INSERT INTO maestros 
        (id_maestro, nombres, apellidos, materia, carrera, telefono, correo) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_maestro, nombres, apellidos, materia, carrera, telefono, correo]
      );
      return { success: true, data: maestro };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async update(maestro) {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = maestro;
      await db.query(
        `UPDATE maestros SET 
        nombres = ?, 
        apellidos = ?, 
        materia = ?, 
        carrera = ?, 
        telefono = ?, 
        correo = ? 
        WHERE id_maestro = ?`,
        [nombres, apellidos, materia, carrera, telefono, correo, id_maestro]
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async delete(id_maestro) {
    try {
      await db.query('DELETE FROM maestros WHERE id_maestro = ?', [id_maestro]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async getMateriasByMaestro(id_maestro) {
    try {
      const [data] = await db.query(
        `SELECT m.* FROM materias m
         JOIN maestro_materia mm ON m.id_materia = mm.id_materia
         WHERE mm.id_maestro = ?`,
        [id_maestro]
      );
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  
  static async getByCarrera(carrera) {
    try {
      const [data] = await db.query(
        'SELECT * FROM maestros WHERE carrera = ?',
        [carrera]
      );
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
  static async partialUpdate(id_maestro, updates) {
    try {
      const setClause = Object.keys(updates)
        .map(key => `${key} = ?`)
        .join(', ');
      
      const values = [...Object.values(updates), id_maestro];
      
      await db.query(
        `UPDATE maestros SET ${setClause} WHERE id_maestro = ?`,
        values
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}