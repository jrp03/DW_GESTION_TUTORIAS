const Materia = require('../models/materia'); // Se extraen las funciones para cada operación CRUD
// Controlador para el módulo de materias

const materiasController = {
   async getMaterias(req, res) {
    try {
      const materias = await Materia.getAll();
      res.json(materias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las materias' });
    }
  },

  async getMateriaById(req, res) {
    const { id } = req.params;
    try {
      const materia = await Materia.getById(id);
      if (!materia) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json(materia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la materia' });
    }
  },

  async createMateria(req, res) {
    const { nombre_materia } = req.body;
      if ( !nombre_materia) {
       return res.status(400).send("Por favor, completa todos los campos.")
     }
    try {
      const nuevaMateria = await Materia.create(nombre_materia);
      res.status(201).json(nuevaMateria);
      if (result.STATUS === "OK") {
       res.send("Registro guardado correctamente.")
     } else {
       res.status(400).send(`Error al guardar el registro: ${nuevaMateria.ERROR}`)
     }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la materia' });
    }
  },

  async updateMateria(req, res) {
    const { id } = req.params;
    const { nombre_materia } = req.body;
    try {
      const result = await Materia.update(id, nombre_materia);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json({ id_materia: id, nombre_materia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la materia' });
    }
  },

  async deleteMateria(req, res) {
    //const { id } = req.params;
    const { id_materia } = req.body;
    try {
      const result = await Materia.delete(id_materia);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Materia no encontrada' });
      }
      res.json({ message: 'Materia eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la materia' });
    }
  }
};


module.exports = materiasController;




 
 
 
 
 
 
 
 
// /**
//  * Obtener todas las materias
//  */
// getAll: async (req, res) => {
//   try {
//     const result = await Materia.getAll()
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({
//       STATUS: "ERROR",
//       ERROR: error.message,
//       DATA: [],
//     })
//   }
// },
//
// /**
//  * Obtener una materia por su ID
//  */
// getById: async (req, res) => {
//   try {
//     const { id } = req.params
//     const result = await Materia.getById(id)
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({
//       STATUS: "ERROR",
//       ERROR: error.message,
//       DATA: [],
//     })
//   }
// },
//
// /**
//  * Crear una nueva materia
//  */
// create: async (req, res) => {
//   try {
//     const { id_materia, nombre_materia } = req.body
//
//     if (!id_materia || !nombre_materia) {
//       return res.status(400).send("Por favor, completa todos los campos.")
//     }
//
//     const result = await Materia.create({ id_materia, nombre_materia })
//
//     if (result.STATUS === "OK") {
//       res.send("Registro guardado correctamente.")
//     } else {
//       res.status(400).send(`Error al guardar el registro: ${result.ERROR}`)
//     }
//   } catch (error) {
//     res.status(500).send(`Error en el servidor: ${error.message}`)
//   }
// },
//
// /**
//  * Actualizar una materia existente
//  */
// update: async (req, res) => {
//   try {
//     const { id_materia, nombre_materia } = req.body
//
//     if (!id_materia || !nombre_materia) {
//       return res.status(400).send("Por favor, completa todos los campos.")
//     }
//
//     const result = await Materia.update({ id_materia, nombre_materia })
//
//     if (result.STATUS === "OK") {
//       res.send("Registro actualizado correctamente.")
//     } else {
//       res.status(400).send(`Error al actualizar el registro: ${result.ERROR}`)
//     }
//   } catch (error) {
//     res.status(500).send(`Error en el servidor: ${error.message}`)
//   }
// },
//
// /**
//  * Eliminar una materia
//  */
// delete: async (req, res) => {
//   try {
//     const { id_materia } = req.body
//
//     if (!id_materia) {
//       return res.status(400).send("Por favor, proporciona el ID de la materia.")
//     }
//
//     const result = await Materia.delete(id_materia)
//
//     if (result.STATUS === "OK") {
//       res.send("Registro eliminado correctamente.")
//     } else {
//       res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
//     }
//   } catch (error) {
//     res.status(500).send(`Error en el servidor: ${error.message}`)
//   }
// },
//

module.exports = materiasController;
