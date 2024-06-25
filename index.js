const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Conexão com o MongoDB usando Mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error', err));

// Schema e Model para Usuário
const userSchema = new mongoose.Schema({
    nome: String,
    cpf: String
});

const User = mongoose.model('User', userSchema);

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servindo arquivos estáticos (index.html, scripts, folhas de estilo, etc.)
app.use(express.static('public'));

// Rota para adicionar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, cpf } = req.body;
        const newUser = new User({ nome, cpf });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para consultar um usuário por CPF
app.get('/usuarios/:cpf', async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const user = await User.findOne({ cpf });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
