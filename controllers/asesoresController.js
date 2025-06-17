import { Asesor } from "../models/asesor.js";

export const asesoresController = {
  getAll: async (req, res) => {
    const result = await Asesor.getAll();
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  },

  getById: async (req, res) => {
    const result = await Asesor.getById(req.params.id);
    if (result.success) {
      if (result.data && result.data.length > 0) {
        res.json(result.data[0]);
      } else {
        res.status(404).json({ error: "Asesor no encontrado" });
      }
    } else {
      res.status(404).json({ error: result.error });
    }
  },

  create: async (req, res) => {
    const { id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia } = req.body;
    
    if (!id_alumno || !nombre || !apellido || !telefono || !correo || !maestro || !carrera || !materia) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const result = await Asesor.create({
      id_alumno, nombre, apellido, telefono, correo, maestro, carrera, materia
    });

    if (result.success) {
      res.status(201).json({ message: "Asesor creado exitosamente" });
    } else {
      res.status(400).json({ error: result.error });
    }
  },

  update: async (req, res) => {
    const { id_alumno, ...datos } = req.body;
    
    if (!id_alumno) {
      return res.status(400).json({ error: "ID de alumno requerido" });
    }

    const result = await Asesor.update({ id_alumno, ...datos });
    if (result.success) {
      res.json({ message: "Asesor actualizado" });
    } else {
      res.status(400).json({ error: result.error });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const result = await Asesor.delete(id);
    if (result.success) {
      res.json({ message: "Asesor eliminado" });
    } else {
      res.status(400).json({ error: result.error });
    }
  },

  getMaterias: async (req, res) => {
    const result = await Asesor.getMaterias();
    res.json(result);
  },

  getMaestros: async (req, res) => {
    const result = await Asesor.getMaestros();
    res.json(result);
  }
};