const mongoose = require("mongoose");
const moment = require("moment-timezone");

const ventasPorMesSchema = new mongoose.Schema({
  mes: {
    type: String,
    required: true,
  },
  totalVendida: {
    type: Number,
    required: true,
  },
  cantidadVendida: {
    type: Number,
    required: true,
  },
  fechaUltVenta: {
    type: String,
    default: () => moment().tz("America/Guatemala").format("DD/MM/YYYY"),
  },
});

const VentasPorMes = mongoose.model("VentasPorMes", ventasPorMesSchema);

module.exports = VentasPorMes;