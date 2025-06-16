import { Master } from "../models/master.js";

export const mastersController = {
  getMaestros: async (req, res) => {
    try {
      const maestros = await Master.getMaestros();
      res.json(maestros);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener maestros" });
    }
  },

  getMaterias: async (req, res) => {
    try {
      const materias = await Master.getMaterias();
      res.json(materias);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener materias" });
    }
  },

  getAsesores: async (req, res) => {
    try {
      const asesores = await Master.getAsesores();
      res.json(asesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener asesores" });
    }
  },

  getSolicitudes: async (req, res) => {
    try {
      const solicitudes = await Master.getSolicitudes();
      res.json(solicitudes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener solicitudes" });
    }
  },

  buscarAvanzada: async (req, res) => {
    try {
      const { maestro, materia, asesor } = req.body;
      const result = await Master.buscarAvanzada({ maestro, materia, asesor });
      
      if (result.success) {
        res.json(result.data);
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFiltrosCompletos: async (req, res) => {
    try {
      const [maestros, materias, asesores] = await Promise.all([
        Master.getMaestros(),
        Master.getMaterias(),
        Master.getAsesores()
      ]);
      
      res.json({
        maestros,
        materias,
        asesores
      });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener filtros completos" });
    }
  }
};