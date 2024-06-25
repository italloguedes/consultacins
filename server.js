const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão com o MongoDB:', err));

const userSchema = new mongoose.Schema({
  fullName: String,
  cpf: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

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
      res.send('Sua CIN está pronta para retirada.');
    } else {
      res.send('Que a CIN ainda não ficou pronta.');
    }
  } catch (error) {
    console.error('Erro ao consultar usuário:', error);
    res.status(500).send('Erro ao consultar usuário');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
