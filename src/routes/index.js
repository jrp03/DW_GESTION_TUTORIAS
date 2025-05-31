const express = require('express');
const asesoresRoutes = require('./asesores');
const authRoutes = require('./auth');
const maestrosRoutes = require('./maestros');
const mastersRoutes = require('./masters');
const materiasRoutes = require('./materias');
const solicitudesRoutes = require('./solicitudes');
const principalRoutes = require('./principal');

const router = express.Router();

// Configurar rutas
router.use("/auth", authRoutes);
router.use("/materias", materiasRoutes);
router.use("/maestros", maestrosRoutes);
router.use("/asesores", asesoresRoutes);
router.use("/solicitudes", solicitudesRoutes);
router.use("/masters", mastersRoutes);
router.use("/pagePrincipal", principalRoutes);

module.exports = router;



