const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/', rolController.listarRoles);
router.post('/crear', rolController.crearRol);
router.get('/editar/:id', rolController.mostrarEditar);
router.post('/editar/:id', rolController.editarRol);
router.post('/eliminar/:id', rolController.eliminarRol);

module.exports = router;