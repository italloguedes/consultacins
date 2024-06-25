const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, 'data', 'usuarios.json');

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servindo arquivos estáticos (index.html, scripts, folhas de estilo, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para adicionar um novo usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, cpf } = req.body;
        
        // Carrega os dados atuais do arquivo JSON
        let usuarios = [];
        try {
            const data = await fs.readFile(dataFilePath, 'utf8');
            usuarios = JSON.parse(data);
        } catch (error) {
            console.error('Erro ao ler o arquivo de dados:', error);
        }
        
        // Adiciona o novo usuário ao array
        usuarios.push({ nome, cpf });
        
        // Salva os dados atualizados de volta no arquivo JSON
        try {
            await fs.writeFile(dataFilePath, JSON.stringify(usuarios, null, 2));
        } catch (error) {
            console.error('Erro ao escrever no arquivo de dados:', error);
        }
        
        res.status(201).json({ nome, cpf });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para consultar um usuário por CPF
app.get('/usuarios/:cpf', async (req, res) => {
    try {
        const cpf = req.params.cpf;
        
        // Carrega os dados atuais do arquivo JSON
        let usuarios = [];
        try {
            const data = await fs.readFile(dataFilePath, 'utf8');
            usuarios = JSON.parse(data);
        } catch (error) {
            console.error('Erro ao ler o arquivo de dados:', error);
        }
        
        // Busca o usuário pelo CPF
        const usuario = usuarios.find(u => u.cpf === cpf);
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
