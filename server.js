const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const { requireAuth } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch(err => {
  console.error('Erro de conexão com o MongoDB:', err);
  process.exit(1);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para consultar usuários por nome completo ou CPF
app.get('/api/users', requireAuth, async (req, res) => {
  const query = req.query.query;

  try {
    // Realizar a consulta no banco de dados
    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } }, // Consulta por nome completo
        { cpf: query } // Consulta por CPF
      ]
    });

    res.json(users);
  } catch (error) {
    console.error('Erro ao consultar usuários:', error);
    res.status(500).json({ error: 'Erro ao consultar usuários' });
  }
});

// Rota para proteger as operações de cadastro
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
