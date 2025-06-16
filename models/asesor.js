import db from "../config/database.js";

export class Asesor {
  static async getAll() {
    return await db.query('SELECT * FROM alumnos');
  }

  static async getById(id_alumno) {
    return await db.query(
      'SELECT * FROM alumnos WHERE id_alumno = @id',
      { id: id_alumno }
    );
  }

  static async create(asesor) {
    return await db.query(
      `INSERT INTO alumnos 
      (id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia) 
      VALUES 
      (@id, @nombre, @apellido, @telefono, @correo, @maestro, @carrera, @materia)`,
      {
        id: asesor.id_alumno,
        nombre: asesor.nombre,
        apellido: asesor.apellido,
        telefono: asesor.telefono,
        correo: asesor.correo,
        maestro: asesor.maestro,
        carrera: asesor.carrera,
        materia: asesor.materia
      }
    );
  }

  static async update(asesor) {
    return await db.query(
      `UPDATE alumnos SET 
      nombre = @nombre, 
      apellido = @apellido, 
      telefono = @telefono, 
      correo = @correo, 
      maestro = @maestro, 
      carrera = @carrera, 
      materia = @materia 
      WHERE id_alumno = @id`,
      {
        nombre: asesor.nombre,
        apellido: asesor.apellido,
        telefono: asesor.telefono,
        correo: asesor.correo,
        maestro: asesor.maestro,
        carrera: asesor.carrera,
        materia: asesor.materia,
        id: asesor.id_alumno
      }
    );
  }

  static async delete(id_alumno) {
    return await db.query(
      'DELETE FROM alumnos WHERE id_alumno = @id',
      { id: id_alumno }
    );
  }

  static async getMaterias() {
    const result = await db.query(
      'SELECT id_materia, nombre_materia FROM materias'
    );
    return result.success ? result.data : [];
  }

  static async getMaestros() {
    const result = await db.query(
      'SELECT id_maestro, nombres, apellidos FROM maestros'
    );
    return result.success ? result.data : [];
  }
}