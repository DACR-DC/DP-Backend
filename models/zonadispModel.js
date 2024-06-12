const mongoose = require('mongoose');

const zonadispSchema = new mongoose.Schema({
  zonadisponible: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

const Dir = mongoose.model('Direcciones', zonadispSchema);

module.exports = Dir;