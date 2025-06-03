const Solicitud = require('../models/solicitud');

// Controlador para el módulo de solicitudes
const solicitudesController = {
  /**
   * Obtener todas las solicitudes
   */
 async getSolicitudes (req, res){
    try {
      const result = await Solicitud.getAll();
      res.json(result);
    } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
  },

  /**
   * Obtener una solicitud por su ID
   */
  async getSolicitudById (req, res){
    const {id} = req.params;
    try {
      const result = await Solicitud.getById(id);
      if (!result) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la solicitud' });
    }
  },

  /**
   * Crear una nueva solicitud
   */
  async createSolicitud (req, res) {
    const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body
      if (!id_alumno || !nombres || !apellidos || !carrera || !asesor || !materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }
    try {
      const nvaSolicitud = await Solicitud.create
      (
        id_alumno, nombres, apellidos, carrera, asesor, materia
      );
      res.status(201).json(nvaSolicitud);
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
   * Actualizar una solicitud existente
   */
  async uptadeSolicitud (req, res) {
    const { id } = req.params 
    const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body
    try {
      const result = await Solicitud.update ( id,id_alumno, nombres, apellidos, carrera, asesor, materia );
      
     if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      res.json({id_solicitud: id, id_alumno, nombres, apellidos, carrera, asesor, materia });
    } catch (error) {
      res.status(500).send({ error: 'Error al actualizar la solicitud' });
    }
  },

  /**
   * Eliminar una solicitud
   */
  async deleteSolicitud (req, res) {
    const { id_solicitud } = req.body
  try {
    const result = await Solicitud.delete(id_solicitud);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'La solicitud no se encuentra en la lista' });
      }
      res.json({ message: 'Solicitud eliminada de la lista correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la solicitud' });
      }
  },

  /**
   * Obtener todas las solicitudes por materias (para el select)
   */
  async getSolicitudMateria  (req, res) {
    try {
      const solicitudMateria = await Solicitud.solicitudMateria()
      res.json(solicitudMateria)
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las materias' });
    }
  },

  /**
   * Obtener todos las solicitudes por asesor (para el select)
   */
 async getSolicitudAsesor  (req, res) {
    try {
      const solicitudAsesor = await Solicitud.solicitudesAsesor()
      res.json(solicitudAsesor)
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los asesores' });
    }
  },
}

module.exports = solicitudesController
