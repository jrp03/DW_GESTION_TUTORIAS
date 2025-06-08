const express = require('express');
const solicitudesController = require('../controllers/solicitudesController');

const router = express.Router()

// Rutas para el módulo de solicitudes
router.get("/", solicitudesController.getSolicitudes) //Get todas las solicitudes
router.get("/materias", solicitudesController.getSolicitudMateria) // Get todas las solicitudes por materias
router.get("/asesores", solicitudesController.getSolicitudAsesor) // Get todos las solicitudes por asesor
router.get("/:id", solicitudesController.getSolicitudById) // Get una solicitud por ID
router.post("/", solicitudesController.createSolicitud) // Post nueva solicitud
router.put("/:id", solicitudesController.uptadeSolicitud ) // Put actualizar solicitud  
router.delete("/:id", solicitudesController.deleteSolicitud) // Delete eliminar solicitud     

module.exports = router;