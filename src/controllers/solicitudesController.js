const Solicitud = require('../models/solicitud');

// Controlador para el módulo de solicitudes
const solicitudesController = {
  /**
   * Obtener todas las solicitudes
   */
<<<<<<< HEAD
  getAll: async (req, res) => {
    try {
      const result = await Solicitud.getAll()
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
 async getSolicitudes (req, res){
    try {
      const result = await Solicitud.getAll();
      res.json(result);
    } catch (error) {
    console.error(error);
      res.status(500).json({ error: 'Error al obtener las solicitudes' });
>>>>>>> prueba-validacion
    }
  },

  /**
   * Obtener una solicitud por su ID
   */
<<<<<<< HEAD
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Solicitud.getById(id)
      res.json(result)
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
        DATA: [],
      })
=======
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
>>>>>>> prueba-validacion
    }
  },

  /**
   * Crear una nueva solicitud
   */
<<<<<<< HEAD
  create: async (req, res) => {
    try {
      const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body

      if (!id_alumno || !nombres || !apellidos || !carrera || !asesor || !materia) {
        return res.status(400).send("Por favor, completa todos los campos.")
      }

      const result = await Solicitud.create({
        id_alumno,
        nombres,
        apellidos,
        carrera,
        asesor,
        materia,
      })

=======
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
>>>>>>> prueba-validacion
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
<<<<<<< HEAD
  update: async (req, res) => {
    try {
      const { id_alumno, nombres, apellidos, carrera, asesor, materia } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Solicitud.update({
        id_alumno,
        nombres,
        apellidos,
        carrera,
        asesor,
        materia,
      })

      if (result.STATUS === "OK") {
        res.send("Registro actualizado correctamente.")
      } else {
        res.status(400).send(`Error al actualizar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
=======
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
>>>>>>> prueba-validacion
    }
  },

  /**
   * Eliminar una solicitud
   */
<<<<<<< HEAD
  deleteSolicitud: async (req, res) => {
    try {
      const { id_alumno } = req.body

      if (!id_alumno) {
        return res.status(400).send("Por favor, ingresa un ID de alumno válido.")
      }

      const result = await Solicitud.delete(id_alumno)

      if (result.STATUS === "OK") {
        res.send("Registro eliminado correctamente.")
      } else {
        res.status(400).send(`Error al eliminar el registro: ${result.ERROR}`)
      }
    } catch (error) {
      res.status(500).send(`Error en el servidor: ${error.message}`)
=======
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
>>>>>>> prueba-validacion
    }
  },

  /**
<<<<<<< HEAD
   * Obtener todas las materias (para el select)
   */
  getMaterias: async (req, res) => {
    try {
      const materias = await Solicitud.getMaterias()
      res.json(materias)
    } catch (error) {
      res.status(500).json([])
    }
  },

  /**
   * Obtener todos los asesores (para el select)
   */
  getAsesores: async (req, res) => {
    try {
      const asesores = await Solicitud.getAsesores()
      res.json(asesores)
    } catch (error) {
      res.status(500).json([])
=======
   * Obtener todos las solicitudes por asesor (para el select)
   */
 async getSolicitudAsesor  (req, res) {
    try {
      const solicitudAsesor = await Solicitud.solicitudesAsesor()
      res.json(solicitudAsesor)
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los asesores' });
>>>>>>> prueba-validacion
    }
  },
}

module.exports = solicitudesController
