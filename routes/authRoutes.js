const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  const { fullName, cpf, password } = req.body;

  try {
    // Verificar se o CPF já está cadastrado
    const existingUser = await User.findOne({ cpf });
    if (existingUser) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Criar novo usuário
    const newUser = new User({ fullName, cpf, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ cpf });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id, cpf: user.cpf },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
