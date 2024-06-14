const Usuario = require('../models/userModel');
/*const Producto = require('../models/prodModel');*/
const bcrypt = require('bcrypt');


exports.registrarUsuario = async (req, res) => {
  console.log('Solicitud recibida');
  const { correo, nombre, contraseña, token, admin } = req.body;

  try {

    const hashedContraseña = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      correo,
      nombre,
      contraseña: hashedContraseña,
      token,
      admin,
    });

    await nuevoUsuario.save();
    res.status(201).json({ success: true, mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const campoDuplicado = Object.keys(error.keyPattern)[0];
      const valorDuplicado = error.keyValue[campoDuplicado];
      return res.status(400).json({ success: false, mensaje: `${campoDuplicado} '${valorDuplicado}' ya existe` });
    }

    res.status(500).json({ success: false, mensaje: 'Error al registrar el usuario', error: error.message });
  }
};
exports.iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    console.log('Solicitud de inicio de sesión recibida');

    const usuario = await Usuario.findOne({ correo });

    if (usuario) {
      console.log('Usuario encontrado:', usuario);

      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

      if (contraseñaValida) {
        console.log('Contraseña válida. Inicio de sesión exitoso');
        res.status(200).json({ success: true, mensaje: 'Inicio de sesión exitoso', nombre: usuario.nombre, admin: usuario.admin });
      } else {
        console.log('Contraseña incorrecta. Inicio de sesión fallido');
        res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
      }
    } else {
      console.log('Usuario no encontrado. Inicio de sesión fallido');
      res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, mensaje: 'Error al iniciar sesión' });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, contraseña, token } = req.body;

  try {

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
    }

    if (nombre) {
      usuario.nombre = nombre;
    }

    if (contraseña) {

      usuario.contraseña = await bcrypt.hash(contraseña, 10);
    }
    if (token) {
      usuario.token = token;
    }

    await usuario.save();

    res.status(200).json({ success: true, mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: 'Error al actualizar el usuario' });
  }
};
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await Usuario.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, mensaje: 'Error al eliminar el usuario', error: error.message });
  }
};

/*
exports.guardarProducto = async (req, res) => {
  console.log('Solicitud recibida');
  const { nombre,descripcion,cantidad,precio } = req.body;

  try {
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      cantidad,
      precio,
    });

    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto guardado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el Producto', error: error.message });
  }
};*/