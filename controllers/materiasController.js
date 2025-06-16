import { Materia } from '../models/materia.js';

// Métodos CRUD básicos
export const getAllMaterias = async (req, res) => {
  try {
    const result = await Materia.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMateriaById = async (req, res) => {
  try {
    const result = await Materia.getById(req.params.id);
    if (result.length === 0) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMateria = async (req, res) => {
  try {
    const { id_materia, nombre_materia } = req.body;
    if (!id_materia || !nombre_materia) {
      return res.status(400).json({ error: "Datos incompletos" });
    }
    const result = await Materia.create({ id_materia, nombre_materia });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_materia } = req.body;
    if (!nombre_materia) {
      return res.status(400).json({ error: "Nombre requerido" });
    }
    const result = await Materia.update(id, { nombre_materia });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Materia.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Métodos adicionales
export const getMateriasByCarrera = async (req, res) => {
  try {
    const result = await Materia.getByCarrera(req.params.carrera);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMateriasByMaestro = async (req, res) => {
  try {
    const result = await Materia.getByMaestro(req.params.idMaestro);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};