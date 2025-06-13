const Asesor = require('../models/asesor');

// Controlador para el módulo de asesores
const asesoresController = {
  /**
   * Obtener todos los asesores
   */
<<<<<<< HEAD
  getAll: async (req, res) => {
    try {
      const result = await Asesor.getAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
  async getAsesores(req, res) {
    try {
      const asesores = await Asesor.getAll();
      res.json(asesores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los maestros' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Obtener un asesor por su ID
   */
<<<<<<< HEAD
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Asesor.getById(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
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
>>>>>>> prueba-validacion
    }
  },

  /**
   * Crear un nuevo asesor
   */
<<<<<<< HEAD
  create: async (req, res) => {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body

      if (!id_alumno || !nombre || !apellido || !telefono || !correo || !maestro || !carrera || !materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Asesor.create({
        id_alumno,
        nombre,
        apellido,
        telefono,
        correo,
        maestro,
        carrera,
        materia,
      })

      if (result.STATUS === "OK") {
        res.send("Registro guardado correctamente.")
      } else {
        res.status(400).send(`Error al guardar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
=======
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
>>>>>>> prueba-validacion
    }
  },

  /**
   * Actualizar un asesor existente
   */
<<<<<<< HEAD
  update: async (req, res) => {
    try {
      const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Asesor.update({
        id_alumno,
        nombre,
        apellido,
        telefono,
        correo,
        maestro,
        carrera,
        materia,
      })

      if (result.STATUS === "OK") {
        res.send("Registro actualizado correctamente.")
      } else {
        res.status(400).send(`Error al actualizar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
=======
 async updateAsesor(req, res) {
    const { id } = req.params;
    const {nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body;
    try {
     const result = await Asesor.update ( id,nombre, apellido, telefono, correo, maestro, carrera, materia );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Asesor no encontrado' });
      }
      res.json({ id_alumno: id,nombre, apellido, telefono, correo, maestro, carrera, materia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar al alumno' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Eliminar un asesor
   */
<<<<<<< HEAD
  deleteAsesor: async (req, res) => {
    try {
      const { id_alumno } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Asesor.delete(id_alumno)

      if (result.STATUS === "OK") {
        res.send("Registro eliminado correctamente.")
      } else {
        res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
=======
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
>>>>>>> prueba-validacion
  },

  /**
   * Obtener todas las materias (para el select)
   */
<<<<<<< HEAD
  getMaterias: async (req, res) => {
    try {
      const materias = await Asesor.getMaterias()
      res.json({ DATA: materias })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta" })
=======
    async getMateriasAlumno(req, res) {
    try {
      const materiaAlumno = await Asesor.getMateriasAlumno();
      res.json(materiaAlumno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las materias' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Obtener todos los maestros (para el select)
   */
<<<<<<< HEAD
  getMaestros: async (req, res) => {
    try {
      const maestros = await Asesor.getMaestros()
      res.json({ DATA: maestros })
    } catch (error) {
      res.status(500).json({ ERROR: "Error en la consulta" })
=======
  async getMaestrosAlumno(req, res) {
    try {
      const maestrosAlumno = await Asesor.getMaestrosAlumno();
      res.json(maestrosAlumno);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener a los maestros' });
>>>>>>> prueba-validacion
    }
  },
}

module.exports = asesoresController;
