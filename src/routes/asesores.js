const express = require('express');
const asesoresController = require('../controllers/asesoresController');
<<<<<<< HEAD

const router = express.Router();

// Rutas para el módulo de asesores
router.get("/", asesoresController.getAll);
router.get("/materias", asesoresController.getMaterias);
router.get("/maestros", asesoresController.getMaestros);
router.get("/:id", asesoresController.getById);
router.post("/guardar", asesoresController.create);
router.post("/editar", asesoresController.update);
router.post("/eliminar", asesoresController.deleteAsesor);
=======
const auth = require('../middelwares/authValidation');

const router = express.Router();

router.get('/', auth.isAuthenticate ,(req, res, next) => {
    res.render('registros_asesores.ejs', {title: 'Registro de Asesores'});
});

// Rutas para el módulo de asesores
router.get("/", asesoresController.getAsesores) // GET todos los asesores
router.get("/materias", asesoresController.getMateriasAlumno) // GET materias por alumno
router.get("/maestros", asesoresController.getMaestrosAlumno) // GET maestros por alumno
router.get("/:id", asesoresController.getAsesorById) // GET un asesor por ID
router.post("/", asesoresController.createAsesor, (req,res,next) => {
    res.render('asesores.ejs', {
        message: 'Asesor creado exitosamente',
        asesor: req.body
    });
});
router.put("/:id", asesoresController.updateAsesor) // PUT actualizar asesor
router.delete("/:id", asesoresController.deleteAsesor) // DELETE eliminar asesor

>>>>>>> prueba-validacion

module.exports = router;