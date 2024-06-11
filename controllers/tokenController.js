const crypto = require("crypto");
const Token = require("../models/tokenModel");

const generarToken = async (req, res) => {
  const longitud = 5;
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < longitud; i++) {
    const indice = crypto.randomInt(0, caracteres.length);
    token += caracteres.charAt(indice);
  }

  try {
    const nuevoToken = new Token({
      token,
      correo: req.body.correo || "",
    });
    await nuevoToken.save();

    setTimeout(async () => {
      await eliminarToken(nuevoToken._id);
    }, 5 * 60 * 1000);

    return token;
  } catch (error) {
    console.error("Error al guardar el token:", error);
    throw new Error("Error al guardar el token en la base de datos");
  }
};

const eliminarToken = async (tokenId) => {
  try {
    await Token.findByIdAndDelete(tokenId);
    console.log(`Token eliminado con ID: ${tokenId}`);
  } catch (error) {
    console.error('Error al eliminar el token:', error);
    throw new Error('Error al eliminar el token de la base de datos');
  }
};

const actualizarCorreo = async (tokenId, nuevoCorreo) => {
  try {
    const token = await Token.findById(tokenId);
    if (!token) {
      throw new Error('Token no encontrado');
    }
    token.correo = nuevoCorreo;
    await token.save();
    console.log(`Correo del token actualizado: ${nuevoCorreo}`);
  } catch (error) {
    console.error('Error al actualizar el correo del token:', error);
    throw new Error('Error al actualizar el correo del token en la base de datos');
  }
};

const buscarToken = async (tokenValor) => {
  try {
    const token = await Token.findOne({ token: tokenValor });
    return token;
  } catch (error) {
    console.error('Error al buscar el token por valor:', error);
    throw new Error('Error al buscar el token por valor en la base de datos');
  }
};
module.exports = {
  generarToken,
  actualizarCorreo,
  eliminarToken,
  buscarToken,
};
