const express = require('express');
const pandelcontroller = require('../controller/pandelcontroller');
const router = express.Router();

// pandel de control por junta
router.get('/obtenereltotaljuntas', pandelcontroller.obtenereltotaljuntas);
router.get('/verinformaciondejunta', pandelcontroller.verinformaciondejunta);
router.get('/totaldeusuariosporjunta/:id_junta', pandelcontroller.totaldeusuariosporjunta);
router.get('/proximareunion/:id_junta', pandelcontroller.proximareunion);
router.get('/votacionesactivasporjunta/:id_junta', pandelcontroller.votacionesactivasporjunta);
router.get('/proyectosactivosporjunta/:id_junta', pandelcontroller.proyectosactivosporjunta);
router.get ('/todoslosusuariosporjunta/:id_junta', pandelcontroller.todoslosusuariosporjunta);
router.get('/votacionesactivas/:id_junta', pandelcontroller.votacionesactivas);
router.get('/proyectosactivos/:id_junta', pandelcontroller.proyectosactivos);

//panel de contol por usuario

router.get('/totaldeusuarios', pandelcontroller.totaldeusuarios);
router.get('/vertodoslosusuarios', pandelcontroller.vertodoslosusuarios);
router.get('/verinfodeusuario/:id_usuario', pandelcontroller.verinfodeusuario);

// panel de control por reunion

router.get('/totaldereunionesen30dias', pandelcontroller.totaldereunionesen30dias);
router.get('/detallesproximareunion', pandelcontroller.detallesproximareunion);
router.get('/inforeunion/:id_reunion', pandelcontroller.inforeunion);
router.get('/infoasistentesunion/:id_reunion', pandelcontroller.infoasistentesunion);
router.get('/totaldeasistentes/:id_reunion', pandelcontroller.totaldeasistentes);

// panel de control por votacion

router.get('/totaldevoaciones', pandelcontroller.totaldevotaciones);
router.get('/totalvotacionesactivas', pandelcontroller.totalvotacionesactivas);
router.get('/infovotacion/:id_votacion', pandelcontroller.infovotacion);
router.get('/infoasistentesvotacion/:id_votacion', pandelcontroller.infoasistentesvotacion);
router.get('/totaldeasistentesvotaciones/:id_votacion', pandelcontroller.totaldeasistentesvotaciones);


// panel de control por proyecto

router.get('/totaldeproyectos', pandelcontroller.totaldeproyectos);
router.get('/proyectosactivossinjunta', pandelcontroller.proyectosactivossinjunta);
router.get('/infoproyecto/:id_proyecto', pandelcontroller.infoproyecto);
router.get('/infoasistentesproyecto/:id_proyecto', pandelcontroller.infoasistentesproyecto);
router.get('/totaldeasistentesproyecto/:id_proyecto', pandelcontroller.totaldeasistentesproyecto);


module.exports = router;