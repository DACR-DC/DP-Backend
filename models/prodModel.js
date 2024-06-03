const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagen: String,
  descripcion: String,
  deTemporada: Boolean,
  opciones: Number,
  opcionesVenta: [
    {
      aVender: String,
      precio: String,
    },
  ],
  disponible:{type:Boolean, default:true}
});

const Producto = mongoose.model('Producto', prodSchema);

module.exports = Producto;