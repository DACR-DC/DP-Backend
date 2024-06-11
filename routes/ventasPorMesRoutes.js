const express = require('express');
const router = express.Router();
const ventasPorMesController = require('../controllers/ventasPorMesController');


router.post('/ventasPorMes', ventasPorMesController.registrarVentasPorMes);
router.get('/ventasPorMes', ventasPorMesController.obtenerVentasPorMes);

module.exports = router;