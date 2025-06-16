import db from "../config/database.js";

export class Materia {
  
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM materias");
      return rows;
    } catch (error) {
      console.error("Error en Materia.getAll:", error);
      throw error;
    }
  }

  
  static async getById(id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM materias WHERE id_materia = ?", 
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error en Materia.getById:", error);
      throw error;
    }
  }

 
  static async create({ id_materia, nombre_materia }) {
    try {
      const [result] = await db.query(
        "INSERT INTO materias (id_materia, nombre_materia) VALUES (?, ?)",
        [id_materia, nombre_materia]
      );
      return { id: id_materia, nombre_materia, affectedRows: result.affectedRows };
    } catch (error) {
      console.error("Error en Materia.create:", error);
      throw error;
    }
  }

 
  static async update(id, { nombre_materia }) {
    try {
      const [result] = await db.query(
        "UPDATE materias SET nombre_materia = ? WHERE id_materia = ?",
        [nombre_materia, id]
      );
      return { id, nombre_materia, affectedRows: result.affectedRows };
    } catch (error) {
      console.error("Error en Materia.update:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query(
        "DELETE FROM materias WHERE id_materia = ?",
        [id]
      );
      return { id, affectedRows: result.affectedRows };
    } catch (error) {
      console.error("Error en Materia.delete:", error);
      throw error;
    }
  }


  static async getByCarrera(carrera) {
    try {
      const [rows] = await db.query(
        "SELECT m.* FROM materias m JOIN carrera_materia cm ON m.id_materia = cm.id_materia WHERE cm.carrera = ?",
        [carrera]
      );
      return rows;
    } catch (error) {
      console.error("Error en Materia.getByCarrera:", error);
      throw error;
    }
  }

 
  static async getByMaestro(idMaestro) {
    try {
      const [rows] = await db.query(
        "SELECT m.* FROM materias m JOIN maestro_materia mm ON m.id_materia = mm.id_materia WHERE mm.id_maestro = ?",
        [idMaestro]
      );
      return rows;
    } catch (error) {
      console.error("Error en Materia.getByMaestro:", error);
      throw error;
    }
  }
}