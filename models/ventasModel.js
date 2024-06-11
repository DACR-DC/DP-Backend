const mongoose = require("mongoose");
const moment = require("moment-timezone");

const ventaSchema = new mongoose.Schema({
  productoNombre: {
    type: String,
    required: true,
  },
  cantidadVendida: {
    type: Number,
    required: true,
  },
  totalVendida: {
    type: Number,
    required: true,
  },
  fechaUltVenta: {
    type: String,
    default: () => moment().tz("America/Guatemala").format("DD/MM/YYYY"),
  },
  fechaPrimeraVenta: {
    type: String,
  },
  fechaUltimaVenta: {
    type: String,
  },
});

const Venta = mongoose.model("Venta", ventaSchema);




module.exports = Venta;
