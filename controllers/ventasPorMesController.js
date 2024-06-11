const VentasPorMes = require("../models/ventasPorMesModel");

exports.registrarVentasPorMes = async (req, res) => {
  try {
    const {  mes, totalVendida, cantidadVendida, ultimaVenta } = req.body;

    const nuevaVentaPorMes = new VentasPorMes({ mes, totalVendida, cantidadVendida, ultimaVenta });
    await nuevaVentaPorMes.save();

    res.status(201).json({ message: "Ventas por mes registradas correctamente" });
  } catch (error) {
    console.error("Error al registrar las ventas por mes:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


exports.obtenerVentasPorMes = async (req, res) => {
  try {
    const ventasPorMes = await VentasPorMes.find();
    res.status(200).json(ventasPorMes);
  } catch (error) {
    console.error("Error al obtener las ventas por mes:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};