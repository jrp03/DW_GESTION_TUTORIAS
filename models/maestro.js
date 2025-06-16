import db from "../config/database.js";

export class Maestro {
  static async getAll() {
    return await db.query('SELECT * FROM maestros');
  }

  static async getById(id_maestro) {
    return await db.query(
      'SELECT * FROM maestros WHERE id_maestro = @id',
      { id: id_maestro }
    );
  }

  static async create(maestro) {
    return await db.query(
      `INSERT INTO maestros 
      (id_maestro, nombres, apellidos, materia, carrera, telefono, correo) 
      VALUES 
      (@id, @nombres, @apellidos, @materia, @carrera, @telefono, @correo)`,
      {
        id: maestro.id_maestro,
        nombres: maestro.nombres,
        apellidos: maestro.apellidos,
        materia: maestro.materia,
        carrera: maestro.carrera,
        telefono: maestro.telefono,
        correo: maestro.correo
      }
    );
  }

  static async update(maestro) {
    return await db.query(
      `UPDATE maestros SET 
      nombres = @nombres, 
      apellidos = @apellidos, 
      materia = @materia, 
      carrera = @carrera, 
      telefono = @telefono, 
      correo = @correo 
      WHERE id_maestro = @id`,
      {
        nombres: maestro.nombres,
        apellidos: maestro.apellidos,
        materia: maestro.materia,
        carrera: maestro.carrera,
        telefono: maestro.telefono,
        correo: maestro.correo,
        id: maestro.id_maestro
      }
    );
  }

  static async delete(id_maestro) {
    return await db.query(
      'DELETE FROM maestros WHERE id_maestro = @id',
      { id: id_maestro }
    );
  }

  static async getMaterias() {
    const result = await db.query(
      'SELECT id_materia, nombre_materia FROM materias'
    );
    return result.success ? result.data : [];
  }

  // NUEVOS MÉTODOS AÑADIDOS:
  static async getMateriasByMaestro(id_maestro) {
    return await db.query(
      `SELECT m.* FROM materias m
       JOIN maestro_materia mm ON m.id_materia = mm.id_materia
       WHERE mm.id_maestro = @id`,
      { id: id_maestro }
    );
  }

  static async getByCarrera(carrera) {
    return await db.query(
      'SELECT * FROM maestros WHERE carrera = @carrera',
      { carrera }
    );
  }

  static async partialUpdate(id_maestro, updates) {
    const setClause = Object.keys(updates)
      .map(key => `${key} = @${key}`)
      .join(', ');

    return await db.query(
      `UPDATE maestros SET ${setClause} WHERE id_maestro = @id`,
      { ...updates, id: id_maestro }
    );
  }
}