const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    correo: 
    { 
      type: String, 
      required: true, 
      unique: true 
    },
    nombre: {
       type: String, 
       required: true 
      },
    contraseña: String,
    token: String,
    admin: { 
      type: Boolean, 
      default: false, 
  }
  });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;