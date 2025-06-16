import { Maestro } from "../models/maestro.js";

// Cambiado a exportaciones individuales
export const getAll = async (req, res) => {
  const result = await Maestro.getAll();
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
};

export const getById = async (req, res) => {
  const result = await Maestro.getById(req.params.id);
  if (result.success) {
    res.json(result.data[0] || {});
  } else {
    res.status(404).json({ error: result.error });
  }
};

export const create = async (req, res) => {
  const { id_maestro, nombres, apellidos, materia, carrera, telefono, correo } = req.body;
  
  if (!id_maestro || !nombres || !apellidos || !materia || !carrera || !telefono || !correo) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const result = await Maestro.create({
    id_maestro, nombres, apellidos, materia, carrera, telefono, correo
  });

  if (result.success) {
    res.status(201).json({ message: "Maestro creado exitosamente" });
  } else {
    res.status(400).json({ error: result.error });
  }
};

export const update = async (req, res) => {
  const { id_maestro, ...datos } = req.body;
  
  if (!id_maestro) {
    return res.status(400).json({ error: "ID de maestro requerido" });
  }

  const result = await Maestro.update({ id_maestro, ...datos });
  if (result.success) {
    res.json({ message: "Maestro actualizado" });
  } else {
    res.status(400).json({ error: result.error });
  }
};

export const partialUpdate = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  if (!id || Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "ID y datos de actualización requeridos" });
  }

  try {
    const result = await Maestro.update({ id_maestro: id, ...updates });
    if (result.success) {
      res.json({ message: "Maestro actualizado parcialmente" });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar maestro" });
  }
};

export const deleteMaestro = async (req, res) => {
  const { id } = req.params;
  const result = await Maestro.delete(id);
  if (result.success) {
    res.json({ message: "Maestro eliminado" });
  } else {
    res.status(400).json({ error: result.error });
  }
};

export const getMateriasByMaestro = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Maestro.getMateriasByMaestro(id);
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: "No se encontraron materias" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener materias" });
  }
};

export const getByCarrera = async (req, res) => {
  const { carrera } = req.params;
  try {
    const result = await Maestro.getByCarrera(carrera);
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(404).json({ error: "No se encontraron maestros" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener maestros" });
  }
};