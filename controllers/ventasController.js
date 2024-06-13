const VentaProducto = require("../models/ventasModel");
const Producto = require("../models/prodModel");

exports.registrarVentaProducto = async (req, res) => {
  try {
    const { productoId, cantidadVendida, totalVendida } = req.body;

    let ventaProducto = await VentaProducto.findOne({ productoId });
    console.log(ventaProducto);
    if (!ventaProducto) {
      ventaProducto = new VentaProducto({
        productoId,
        cantidadVendida,
        totalVendida,
      });
    } else {
      ventaProducto.cantidadVendida  += 1;
      ventaProducto.fechaUltimaVenta = Date.now();
      ventaProducto.totalVendida = totalVendida;
    }

    if (!ventaProducto.fechaPrimeraVenta) {
      ventaProducto.fechaPrimeraVenta = Date.now();
    }

    await ventaProducto.save();

    const producto = await Producto.findById(productoId);
    if (producto) {
      producto.fechaPrimeraVenta = producto.fechaPrimeraVenta || Date.now();
      producto.fechaUltimaVenta = Date.now();
      await producto.save();
    }

    res
      .status(201)
      .json({ message: "Venta de producto registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar la venta de producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.masVendido = async (req, res) => {
  try {
    const masVendido = await VentaProducto.findOne().sort({
      cantidadVendida: -1,
    });
    res.status(200).json(masVendido);
  } catch (error) {
    console.error("Error al obtener el producto más vendido:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.menosVendido = async (req, res) => {
  try {
    const menosVendido = await VentaProducto.findOne().sort({
      cantidadVendida: 1,
    });
    res.status(200).json(menosVendido);
  } catch (error) {
    console.error("Error al obtener el producto menos vendido:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.totalVentas = async (req, res) => {
  try {
    const ventas = await VentaProducto.find();

    let totalVendido = 0;
    let cantidadVendida = 0;
    let ultimaVenta = null;
    ventas.forEach((venta) => {
      cantidadVendida += venta.cantidadVendida;
      totalVendido += venta.totalVendida;
      if (!ultimaVenta || venta.fechaUltVenta > ultimaVenta) {
        ultimaVenta = venta.fechaUltVenta;
      }
    });

    res.status(200).json({
      totalVentas: totalVendido,
      totalCantidadVendido: cantidadVendida,
      ultimaVenta: ultimaVenta,
    });
  } catch (error) {
    console.error("Error al obtener el total de ventas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
