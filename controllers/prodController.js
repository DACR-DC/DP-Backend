const Producto = require('../models/prodModel');


exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    console.log('Intentando obtener productos...');

    const productos = await Producto.find();
    // console.log('Productos obtenidos:', productos);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(`Intentando obtener producto con ID: ${id}`);

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.obtenerImagenProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto || !producto.imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    res.json({ imagen: producto.imagen });
  } catch (error) {
    console.error('Error al obtener la imagen del producto:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const ordenExistente = await Producto.findById(id);

    if (!ordenExistente) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await Producto.deleteOne({ _id: id });

    res.status(200).json({ message: 'Producto Eliminado' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el producto' });
  }
};

exports.actualizarDisponibilidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { disponible } = req.body;

    const productoExistente = await Producto.findById(id);
    if (!productoExistente) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productoExistente.disponible = disponible;
    await productoExistente.save();

    res.status(200).json({ message: 'Disponibilidad actualizada correctamente' });
    console.log("Disponibilidad actualizada ")
  } catch (error) {
    console.error('Error al actualizar la disponibilidad del producto:', error);
    console.log("error al actualizar la disp", error)
    res.status(500).json({ message: 'Ocurrió un error al actualizar la disponibilidad del producto' });
  }
};
/*
module.exports = {
  crearProducto,
  obtenerProductos,
  eliminarProducto
};*/