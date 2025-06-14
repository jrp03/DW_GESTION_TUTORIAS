const express = require('express');
const solicitudesController = require('../controllers/solicitudesController');

const router = express.Router()

// Rutas para el módulo de solicitudes
<<<<<<< HEAD
router.get("/", solicitudesController.getAll)
router.get("/materias", solicitudesController.getMaterias)
router.get("/asesores", solicitudesController.getAsesores)
router.get("/:id", solicitudesController.getById)
router.post("/guardar", solicitudesController.create)
router.post("/editar", solicitudesController.update)
router.post("/eliminar", solicitudesController.deleteSolicitud)
=======
router.get("/", solicitudesController.getSolicitudes) //Get todas las solicitudes
router.get("/materias", solicitudesController.getSolicitudMateria) // Get todas las solicitudes por materias
router.get("/asesores", solicitudesController.getSolicitudAsesor) // Get todos las solicitudes por asesor
router.get("/:id", solicitudesController.getSolicitudById) // Get una solicitud por ID
router.post("/", solicitudesController.createSolicitud) // Post nueva solicitud
router.put("/:id", solicitudesController.uptadeSolicitud ) // Put actualizar solicitud  
router.delete("/:id", solicitudesController.deleteSolicitud) // Delete eliminar solicitud     
>>>>>>> prueba-validacion

module.exports = router;