const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware para processar requisições JSON
app.use(bodyParser.json());

// Conexão com o MongoDB usando Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  fullName: String,
  cpf: String,
});

// Criando o modelo User baseado no esquema
const User = mongoose.model('User', userSchema);

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para enviar o arquivo index.html ao acessar '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para enviar o arquivo cadastro.html ao acessar '/cadastro'
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Rota para cadastrar um novo usuário
app.post('/cadastro', async (req, res) => {
  const { fullName, cpf } = req.body;

  try {
    const newUser = new User({ fullName, cpf });
    await newUser.save();
    res.send('Cadastro realizado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

// Rota para consultar um usuário por nome ou CPF
app.get('/consulta', async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { cpf: query }
      ]
    });

    if (users.length > 0) {
      res.send('Usuário encontrado: ' + users.map(user => `${user.fullName} (${user.cpf})`).join(', '));
    } else {
      res.send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao consultar usuário:', error);
    res.status(500).send('Erro ao consultar usuário');
  }
});

// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
