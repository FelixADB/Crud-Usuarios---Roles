const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const upload = require('../middlewares/upload'); // El middleware que creamos antes

router.get('/', usuarioController.listarUsuarios);
router.post('/crear', upload.single('imagen'), usuarioController.crearUsuario);
router.get('/editar/:id', usuarioController.mostrarEditar);
router.post('/editar/:id', upload.single('imagen'), usuarioController.editarUsuario);
router.post('/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;