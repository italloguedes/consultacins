const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para consultar um usuário pelo CPF e/ou nome
router.get('/', async (req, res) => {
  try {
    const cpf = req.query.cpf;
    const nome = req.query.nome;

    let user;
    if (cpf) {
      user = await User.findOne({ cpf });
    } else if (nome) {
      user = await User.findOne({ name: nome });
    }

    if (user) {
      res.json({ encontrado: true });
    } else {
      res.json({ encontrado: false });
    }
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
