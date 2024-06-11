const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.post('/generar-token', async (req, res) => {
  try {
    const nuevoToken = await tokenController.generarToken(req);
    res.json({ token: nuevoToken });
  } catch (error) {
    console.error('Error al generar el token:', error);
    res.status(500).json({ error: 'Error al generar el token' });
  }
});

router.get('/token/:tokenValor', async (req, res) => {
  const { tokenValor } = req.params;
  try {
    const token = await tokenController.buscarToken(tokenValor);
    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }
    res.json(token);
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.status(500).json({ error: 'Error al obtener el token' });
  }
});

router.put('/actualizar-correo/:tokenValor', async (req, res) => {
  const { tokenValor } = req.params;
  const { nuevoCorreo } = req.body;
  try {
    const token = await tokenController.buscarToken(tokenValor);
    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }
    await tokenController.actualizarCorreo(token._id, nuevoCorreo);
    res.json({ mensaje: 'Correo del token actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el correo del token:', error);
    res.status(500).json({ error: 'Error al actualizar el correo del token' });
  }
});

module.exports = router;
