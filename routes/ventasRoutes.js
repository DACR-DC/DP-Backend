const express = require('express');
const router = express.Router();
const ventaProductoController = require('../controllers/ventasController');

router.post('/ventas', ventaProductoController.registrarVentaProducto);
router.get('/ventas/mas-vendido', ventaProductoController.masVendido);
router.get('/ventas/menos-vendido', ventaProductoController.menosVendido);
router.get('/ventas/totalVendido', ventaProductoController.totalVentas);
router.get('/ventas/todasVentas', ventaProductoController.obtenerTodasLasVentas);
router.delete('/ventas', ventaProductoController.eliminarVentas);
module.exports = router;