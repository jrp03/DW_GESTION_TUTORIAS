import db from "../config/database.js";

export class Materia {
  static async getAll() {
    const result = await db.query("SELECT * FROM materias");
    return result;
  }

  static async getById(id) {
    const result = await db.query(
      "SELECT * FROM materias WHERE id_materia = @id",
      { id }
    );
    return result;
  }

  // ... otros métodos (create, update, delete, etc.)
}