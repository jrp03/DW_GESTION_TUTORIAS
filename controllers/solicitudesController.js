import { Solicitud } from "../models/solicitud.js";

// Métodos CRUD básicos
export const getAll = async (req, res) => {
  try {
    const result = await Solicitud.getAll();
    res.json(result.data || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const result = await Solicitud.getById(req.params.id);
    res.json(result.data[0] || {});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Métodos adicionales
export const getByEstado = async (req, res) => {
  try {
    const result = await Solicitud.getByEstado(req.params.estado);
    res.json(result.data || []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getByAlumno = async (req, res) => {
  try {
    const result = await Solicitud.getByAlumno(req.params.idAlumno);
    res.json(result.data || []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getByAsesor = async (req, res) => {
  try {
    const result = await Solicitud.getByAsesor(req.params.idAsesor);
    res.json(result.data || []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getByMateria = async (req, res) => {
  try {
    const result = await Solicitud.getByMateria(req.params.idMateria);
    res.json(result.data || []);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};