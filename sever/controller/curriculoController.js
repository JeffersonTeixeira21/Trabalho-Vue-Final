const Curriculo = require('../models/curriculo');

// Listar currículos do usuário autenticado
exports.list = async (req, res) => {
  try {
    const curriculos = await Curriculo.find({ userId: req.user._id });
    res.json(curriculos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar currículos', error: err });
  }
};

// Criar currículo
exports.create = async (req, res) => {
  try {
    const curriculo = new Curriculo({ ...req.body, userId: req.user._id });
    await curriculo.save();
    res.status(201).json(curriculo);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar currículo', error: err });
  }
};

// Atualizar currículo
exports.update = async (req, res) => {
  try {
    const curriculo = await Curriculo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!curriculo) return res.status(404).json({ message: 'Currículo não encontrado' });
    res.json(curriculo);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar currículo', error: err });
  }
};

// Excluir currículo
exports.remove = async (req, res) => {
  try {
    const curriculo = await Curriculo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!curriculo) return res.status(404).json({ message: 'Currículo não encontrado' });
    res.json({ message: 'Currículo excluído com sucesso' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao excluir currículo', error: err });
  }
};
