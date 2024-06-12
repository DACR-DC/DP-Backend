const ZonaDisponible = require('../models/zonadispModel');


exports.crearZona = async (req, res) => {
  try {
    const { zonadisponible, precio } = req.body;
    const nuevaZonaDisponible = new ZonaDisponible({ zonadisponible, precio });
    const savedZonaDisponible = await nuevaZonaDisponible.save();
    res.status(201).json(savedZonaDisponible);
  } catch (error) {
    console.error('Error al crear la zona:', error);
    res.status(500).json({ message: 'Ocurrió un error al crear la zona disponible' });
  }
};


exports.ZonasDisponibles = async (req, res) => {
  try {
    const zonasDisponibles = await ZonaDisponible.find();
    res.json(zonasDisponibles);
  } catch (error) {
    console.error('Error al obtener las zonas disponibles:', error);
    res.status(500).json({ message: 'error al obtener las zonas disponibles' });
  }
};


exports.eliminarZona = async (req, res) => {
  try {
    const { id } = req.params;
    const zonaDisponibleExistente = await ZonaDisponible.findById(id);

    if (!zonaDisponibleExistente) {
      return res.status(404).json({ message: 'Zona disponible no encontrada' });
    }

    await ZonaDisponible.deleteOne({ _id: id });

    res.status(200).json({ message: 'Zona disponible eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la zona disponible:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar la zona disponible' });
  }
};