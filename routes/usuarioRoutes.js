const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();

router.post('/registrar-usuario', usuarioController.registrarUsuario);
router.post('/login', usuarioController.iniciarSesion); 
router.put('/actualizar-usuario/:id', usuarioController.actualizarUsuario);
router.get('/usuarios', usuarioController.getAllUsuarios);
router.delete('/eliminar-usuario/:correo', usuarioController.eliminarUsuario);
module.exports = router;