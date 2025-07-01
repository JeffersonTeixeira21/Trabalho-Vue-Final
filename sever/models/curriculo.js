const mongoose = require('mongoose');

const curriculoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String },
  resumo: { type: String },
  experiencias: { type: [String], default: [] },
  formacoes: { type: [String], default: [] },
  habilidades: { type: String },
  links: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Curriculo', curriculoSchema);
