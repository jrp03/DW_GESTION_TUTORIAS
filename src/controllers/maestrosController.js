const Maestro = require('../models/maestro');

// Controlador para el módulo de maestros
const maestrosController = {
  /**
   * Obtener todos los maestros
   */
  async getMaestros(req, res) {
    try {
      const maestros = await Maestro.getAll();
      res.json(maestros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los maestros' });
    }
  },

  /**
   * Obtener un maestro por su ID
   */
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
    }
  },

  /**
   * Crear un nuevo maestro
   */
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
    }
  },

  /**
   * Eliminar un maestro
   */
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
  },

  /**
   * Obtener todas las materias (para el select)
   */

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