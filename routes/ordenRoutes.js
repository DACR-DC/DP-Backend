const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

router.post('/ordenes', ordenController.crearOrden);
router.get('/ordenes', ordenController.obtenerOrdenes);
router.put('/ordenes/:id', ordenController.actualizarOrden);
router.delete('/ordenes/:id', ordenController.eliminarOrden);

module.exports = router;
