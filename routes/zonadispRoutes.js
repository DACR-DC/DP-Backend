const express = require('express');
const router = express.Router();
const zonadispController = require('../controllers/zonadispController');

router.post('/zonadisp', zonadispController.crearZona);
router.get('/zonadisp', zonadispController.ZonasDisponibles);
router.delete('/zonadisp/:id', zonadispController.eliminarZona);
module.exports = router;