const Asesor = require('../models/asesor');

// Controlador para el módulo de asesores
const asesoresController = {
  /**
   * Obtener todos los asesores
   */
  async getAsesores(req, res) {
    try {
      const asesores = await Asesor.getAll();
      res.json(asesores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los maestros' });
    }
  },

  /**
   * Obtener un asesor por su ID
   */
   async getAsesorById(req, res) {
    const { id } = req.params;
    try {
      const asesor = await Asesor.getById(id);
      if (!asesor) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      res.json(asesor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener al alumno' });
    }
  },

  /**
   * Crear un nuevo asesor
   */
   async createAsesor(req, res) {
  const { id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body;
  if (!id_alumno,!nombre || !apellido || !telefono || !correo || !maestro || !carrera || !materia) {  
    return res.status(400).send("Por favor, completa todos los campos");
  }
    try {
      const nuevoAsesor = await Asesor.create(id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia);
      res.status(201).json(nuevoAsesor);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al añadir nuevo asesor' });
    }
  },

  /**
   * Actualizar un asesor existente
   */
 async updateAsesor(req, res) {
    const { id } = req.params;
    const {id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body;
    try {
     const result = await Asesor.update ( id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Asesor no encontrado' });
      }
      res.json({ id_alumno,nombre, apellido, telefono, correo, maestro, carrera, materia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar al alumno' });
    }
  },

  /**
   * Eliminar un asesor
   */
  async deleteAsesor(req, res) {
    const { id_alumno } = req.body
    try {
      const result = await Asesor.delete(id_alumno);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Alumno no se encuentra en la lista' });
      }
      res.json({ message: 'Alumno eliminado de la lista correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar alumno' });
      }
  },

  /**
   * Obtener todas las materias (para el select)
   */
    async getMateriasAlumno(req, res) {
    try {
      const materiaAlumno = await Asesor.getMateriasAlumno();
      res.json(materiaAlumno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las materias' });
    }
  },

  /**
   * Obtener todos los maestros (para el select)
   */
  async getMaestrosAlumno(req, res) {
    try {
      const maestrosAlumno = await Asesor.getMaestrosAlumno();
      res.json(maestrosAlumno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener a los maestros' });
    }
  },
}

module.exports = asesoresController;
