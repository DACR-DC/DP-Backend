const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ordenSchema = new mongoose.Schema({
  numeroOrden: {
    type: String,
    required: true,
    unique: true
  },
  informacionUsuario: {
    cuiDpi: { type: String, required: true },
    nombreRecibe: { type: String, required: true },
    telefono: { type: String, required: true },
    direccionOhoraRecoger: { type: String, required: true }
  },
  carrito: {
    type: Array,
    required: true
  },
  totalPrecio: {
    type: Number,
    required: true
  },
  aDomicilio: { type: Boolean }, 
  recogerEnTienda: { type: Boolean },
  zonaEntrega: { type: String } ,
  entregado: { type: Boolean, default: false },
  fechaOrden: {
    type: String,
    default: () => moment().tz('America/Guatemala').format('DD/MM/YYYY')
  },
  hora: {
    type: String,
    default: () => moment().tz('America/Guatemala').format('HH:mm') 
  }
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
