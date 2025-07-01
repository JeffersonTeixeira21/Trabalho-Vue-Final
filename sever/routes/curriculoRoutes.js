const express = require('express');
const { auth } = require('../controller/authController');
const curriculoController = require('../controller/curriculoController');

const router = express.Router();

// Todas as rotas exigem autenticação
router.get('/', auth, curriculoController.list);
router.post('/', auth, curriculoController.create);
router.put('/:id', auth, curriculoController.update);
router.delete('/:id', auth, curriculoController.remove);

module.exports = router;
