const Orden = require("../models/ordenModel");
const Venta = require("../models/ventasModel");
const VentasPorMes = require("../models/ventasPorMesModel");

exports.crearOrden = async (req, res) => {
  try {
    const {
      informacionUsuario,
      carrito,
      totalPrecio,
      aDomicilio,
      zonaEntrega,
      envio,
      recogerEnTienda,
      entregado,
      fechaOrden,
      hora,
    } = req.body;
    const numeroOrden = await generarNumeroOrden();
    const nuevaOrden = new Orden({
      numeroOrden,
      informacionUsuario,
      carrito,
      totalPrecio,
      aDomicilio,
      zonaEntrega,
      envio,
      recogerEnTienda,
      entregado,
      fechaOrden,
      hora,
    });
    const ordenGuardada = await nuevaOrden.save();

    //ESTO ES PARA GUARDAR EN VENTAS
    for (const item of carrito) {
      const cantidadVendida = parseInt(item.opcionesVenta[0].cantidad)-parseInt(item.opcionesVenta[0].cantidad)+1;
      
      console.log(item);
      console.log(cantidadVendida);
      if (isNaN(cantidadVendida)) {
        console.error("Error: La cantidad vendida no es un número válido");
        continue;
      }

      const precioUnitario = parseInt(item.opcionesVenta[0].precio);
      if (isNaN(precioUnitario)) {
        console.error("Error: El precio es inválido");
        continue;
      }

      const totalVendida = precioUnitario;

      let ventaProducto = await Venta.findOne({ productoNombre: item.nombre });

      if (!ventaProducto) {
        ventaProducto = new Venta({
          productoNombre: item.nombre,
          cantidadVendida,
          totalVendida,
          fechaPrimeraVenta: fechaOrden,
          fechaUltimaVenta: fechaOrden,
        });
      } else {
        ventaProducto.cantidadVendida += 1;
        ventaProducto.totalVendida += totalVendida;
        ventaProducto.fechaUltimaVenta = fechaOrden;
      }

      await ventaProducto.save();
    }
    //FIN GUARDAR EN VENTAS

    //ESTO ES PARA GUARDAR EN VENTAS POR MES
    const today = new Date();
    const nombreMes = today.toLocaleString('es', { month: 'long' }).toUpperCase();


    for (const item of carrito) {
      const cantidadVendida = parseInt(item.opcionesVenta[0].cantidad);
      
      console.log(cantidadVendida);
      if (isNaN(cantidadVendida)) {
        console.error("Error: La cantidad vendida no es un número válido");
        continue;
      }

      const precioUnitario = parseInt(item.opcionesVenta[0].precio);
      if (isNaN(precioUnitario)) {
        console.error("Error: El precio es inválido");
        continue;
      }

      const totalVendida = precioUnitario;

      const ventasPorEsteMes = await VentasPorMes.findOne({ mes: nombreMes });
      if (ventasPorEsteMes) {
        ventasPorEsteMes.totalVendida += totalVendida;
        ventasPorEsteMes.cantidadVendida += 1;
        ventasPorEsteMes.ultimaVenta = item.fechaUltVenta;
        await ventasPorEsteMes.save();
      } else {
        const nuevaVentaPorMes = new VentasPorMes({
          mes: nombreMes,
          totalVendida,
          cantidadVendida,
          ultimaVenta: item.fechaUltVenta
        });
        await nuevaVentaPorMes.save();
      }
    }
    //FIN VENTAS POR MES

    //CONTINUACION PARA CONFIRMAR TODO
    res.status(201).json(ordenGuardada);
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Ocurrió un error al crear la orden" });
  }
};

async function generarNumeroOrden() {
  const ultimaOrden = await Orden.findOne().sort({ _id: -1 });
  let numeroOrden;
  if (ultimaOrden) {
    const ultimoNumeroOrden = parseInt(ultimaOrden.numeroOrden.split("-")[1]);
    numeroOrden = `w-${ultimoNumeroOrden + 1}`;
  } else {
    numeroOrden = "w-1";
  }
  return numeroOrden;
}

exports.obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.status(200).json(ordenes);
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al obtener las órdenes" });
  }
};

exports.actualizarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { entregado } = req.body;

    const ordenExistente = await Orden.findById(id);
    if (!ordenExistente) {
      return res.status(404).json({ message: "Orden No encontrada" });
    }

    ordenExistente.entregado = entregado;
    await ordenExistente.save();

    res.status(200).json({ message: "Orden actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar la orden" });
  }
};

exports.eliminarOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const ordenExistente = await Orden.findById(id);

    if (!ordenExistente) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    await Orden.deleteOne({ _id: id });

    res.status(200).json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({ message: "Ocurrió un error al eliminar la orden" });
  }
};
