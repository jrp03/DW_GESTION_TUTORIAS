import { Materia } from '../models/materia.js';

export const materiasController = {
  // Métodos CRUD básicos
  getAll: async (req, res) => {
    try {
      const result = await Materia.getAll();

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA,
          META: result.META
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materias",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en materiasController.getAll:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor",
        ...(process.env.NODE_ENV === 'development' && { DETAILS: error.message })
      });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await Materia.getById(req.params.id);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      if (result.STATUS === "NOT_FOUND") {
        return res.status(404).json({
          STATUS: "NOT_FOUND",
          ERROR: result.ERROR
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materia",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en materiasController.getById:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  create: async (req, res) => {
    try {
      const result = await Materia.create(req.body);

      if (result.STATUS === "OK") {
        return res.status(201).json({
          STATUS: "OK",
          DATA: result.DATA,
          META: result.META
        });
      }

      if (result.STATUS === "INVALID_INPUT") {
        return res.status(400).json({
          STATUS: "INVALID_INPUT",
          ERROR: result.ERROR
        });
      }

      if (result.CODE === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          STATUS: "CONFLICT",
          ERROR: "El ID de materia ya existe"
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al crear materia",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en materiasController.create:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Materia.update(id, req.body);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          META: result.META
        });
      }

      if (result.STATUS === "NOT_FOUND") {
        return res.status(404).json({
          STATUS: "NOT_FOUND",
          ERROR: result.ERROR
        });
      }

      if (result.STATUS === "INVALID_INPUT") {
        return res.status(400).json({
          STATUS: "INVALID_INPUT",
          ERROR: result.ERROR
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al actualizar materia",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en materiasController.update:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Materia.delete(id);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          META: result.META
        });
      }

      if (result.STATUS === "NOT_FOUND") {
        return res.status(404).json({
          STATUS: "NOT_FOUND",
          ERROR: result.ERROR
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al eliminar materia",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en materiasController.delete:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  // Métodos adicionales
  getByCarrera: async (req, res) => {
    try {
      const result = await Materia.getByCarrera(req.params.carrera);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materias por carrera"
      });

    } catch (error) {
      console.error('Error en materiasController.getByCarrera:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  getByMaestro: async (req, res) => {
    try {
      const result = await Materia.getByMaestro(req.params.idMaestro);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materias por maestro"
      });

    } catch (error) {
      console.error('Error en materiasController.getByMaestro:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  }
};