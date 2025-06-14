const Maestro = require('../models/maestro');

// Controlador para el módulo de maestros
const maestrosController = {
  /**
   * Obtener todos los maestros
   */
<<<<<<< HEAD
  getAll: async (req, res) => {
    try {
      const result = await Maestro.getAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
  async getMaestros(req, res) {
    try {
      const maestros = await Maestro.getAll();
      res.json(maestros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los maestros' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Obtener un maestro por su ID
   */
<<<<<<< HEAD
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Maestro.getById(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
   async getMaestroById(req, res) {
    const { id } = req.params;
    try {
      const maestro = await Maestro.getById(id);
      if (!maestro) {
        return res.status(404).json({ error: 'Maestro no encontrada' });
      }
      res.json(maestro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener al maestro' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Crear un nuevo maestro
   */
<<<<<<< HEAD
  create: async (req, res) => {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = req.body

      if (!id_maestro || !nombres || !apellidos || !materia || !carrera || !telefono || !correo) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Maestro.create({
        id_maestro,
        nombres,
        apellidos,
        materia,
        carrera,
        telefono,
        correo,
      })

      if (result.STATUS === "OK") {
        res.send("Registro guardado correctamente.")
      } else {
        res.status(400).send(`Error al guardar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
  },

  /**
   * Actualizar un maestro existente
   */
  update: async (req, res) => {
    try {
      const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = req.body

      if (!id_maestro) {
        return res.status(400).send("Por favor, ingresa un ID de maestro válido.")
      }

      const result = await Maestro.update({
        id_maestro,
        nombres,
        apellidos,
        materia,
        carrera,
        telefono,
        correo,
      })

      if (result.STATUS === "OK") {
        res.send("Registro actualizado correctamente.")
      } else {
        res.status(400).send(`Error al actualizar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
=======
 async createMaestro(req, res) {
  const { id_maestro,nombres, apellidos, materia, carrera, telefono, correo } = req.body;
  if (!id_maestro,!nombres || !apellidos || !materia || !carrera || !telefono || !correo) {
    return res.status(400).send("Por favor, completa todos los campos");
  }
    try {
      const nuevoMaestro = await Maestro.create(id_maestro,nombres,apellidos,materia,carrera,telefono,correo);
      res.status(201).json(nuevoMaestro);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al añadir nuevo maestro' });
    }
  },


  /**
   * Actualizar un maestro existente
   */
 async updateMaestro(req, res) {
    const { id } = req.params;
    const {nombres,apellidos,materia,carrera,telefono,correo } = req.body;
    try {
     const result = await Maestro.update ( id_maestro, nombres, apellidos, materia, carrera, telefono, correo );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json({ id_maestro: id, nombres, apellidos, materia, carrera, telefono, correo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar al maestro' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Eliminar un maestro
   */
<<<<<<< HEAD
  deleteMaestro: async (req, res) => {
    try {
      const { id_maestro } = req.body

      if (!id_maestro) {
        return res.status(400).send("Por favor, ingresa un ID de maestro válido.")
      }

      const result = await Maestro.delete(id_maestro)

      if (result.STATUS === "OK") {
        res.send("Registro eliminado correctamente.")
      } else {
        res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
    }
=======
  async deleteMaestro(req, res) {
    const { id_maestro } = req.body
    try {
      const result = await Maestro.delete(id_maestro);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Maestro no se encuentra en la lista' });
      }
      res.json({ message: 'Maestro eliminado de la lista correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar maestro' });
      }
>>>>>>> prueba-validacion
  },

  /**
   * Obtener todas las materias (para el select)
   */
<<<<<<< HEAD
  getMaterias: async (req, res) => {
    try {
      const materias = await Maestro.getMaterias()
      res.json(materias)
    } catch (error) {
      res.status(500).json([])
    }
  },
}

module.exports = maestrosController
=======

  async getMateriasPorMaestro(req, res) {
    try {
      const materiaMaestro = await Maestro.getMateriasPorMaestro();
      res.json(materiaMaestro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las materias' });
    }
  },
  
}

module.exports = maestrosController;
>>>>>>> prueba-validacion
