import { Maestro } from '../models/maestro.js';

export const maestrosController = {
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 20, carrera } = req.query;
      const result = await Maestro.getAll({ 
        page: parseInt(page), 
        limit: parseInt(limit),
        filtros: { carrera }
      });

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA,
          META: result.META
        });
      }
      
      return res.status(result.statusCode || 500).json({
        STATUS: result.STATUS,
        ERROR: result.ERROR,
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });
      
    } catch (error) {
      console.error('Error en maestrosController.getAll:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor",
        ...(process.env.NODE_ENV === 'development' && { DETAILS: error.message })
      });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await Maestro.getById(req.params.id);

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
        ERROR: result.ERROR || "Error al obtener maestro",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en maestrosController.getById:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  create: async (req, res) => {
    try {
      const result = await Maestro.create(req.body);

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
          ERROR: "El ID de maestro ya existe"
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al crear maestro",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en maestrosController.create:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Maestro.update({ id_maestro: id, ...req.body });

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
        ERROR: result.ERROR || "Error al actualizar maestro",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en maestrosController.update:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Maestro.delete(id);

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
        ERROR: result.ERROR || "Error al eliminar maestro",
        ...(result.DETAILS && { DETAILS: result.DETAILS })
      });

    } catch (error) {
      console.error('Error en maestrosController.delete:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  getMaterias: async (req, res) => {
    try {
      const result = await Maestro.getMaterias();

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materias"
      });

    } catch (error) {
      console.error('Error en maestrosController.getMaterias:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  getCarreras: async (req, res) => {
    try {
      const result = await Maestro.getCarreras();

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener carreras"
      });

    } catch (error) {
      console.error('Error en maestrosController.getCarreras:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  getMateriasByMaestro: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Maestro.getMateriasByMaestro(id);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener materias del maestro"
      });

    } catch (error) {
      console.error('Error en maestrosController.getMateriasByMaestro:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  },

  getByCarrera: async (req, res) => {
    try {
      const { carrera } = req.params;
      const result = await Maestro.getByCarrera(carrera);

      if (result.STATUS === "OK") {
        return res.json({
          STATUS: "OK",
          DATA: result.DATA
        });
      }

      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: result.ERROR || "Error al obtener maestros por carrera"
      });

    } catch (error) {
      console.error('Error en maestrosController.getByCarrera:', error);
      return res.status(500).json({
        STATUS: "ERROR",
        ERROR: "Error interno del servidor"
      });
    }
  }
};