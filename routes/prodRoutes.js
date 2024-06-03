const express = require('express');
const router = express.Router();
const prodController = require('../controllers/prodController');


router.post('/productos', prodController.crearProducto);
router.get('/productos', prodController.obtenerProductos);
router.delete('/productos/:id', prodController.eliminarProducto);
router.put('/productos/:id', prodController.actualizarDisponibilidad);
module.exports = router;