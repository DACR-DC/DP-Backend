const mongoose = require('mongoose');

const zonadispSchema = new mongoose.Schema({
  zonadisponible: {
    type: String,
    required: true,
  },
});

const dir = mongoose.model('Direcciones', zonadispSchema);

module.exports = dir;