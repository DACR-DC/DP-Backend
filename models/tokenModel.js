const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    default: "",
  },
  vencimiento: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;