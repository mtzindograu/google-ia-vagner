// Importando pacotes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurando o app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectando ao MongoDB (substitua pelo seu URI do MongoDB Atlas)
const mongoURI = 'mongodb+srv://<seu-usuario>:<sua-senha>@<seu-cluster>.mongodb.net/chatbotDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Definindo o modelo do MongoDB
const historySchema = new mongoose.Schema({
    userId: String,
    action: String,
    timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

// Rota para salvar o histórico de ações
app.post('/save-history', async (req, res) => {
    const { userId, action } = req.body;

    try {
        const newHistory = new History({ userId, action });
        await newHistory.save();
        res.status(200).send('Histórico salvo com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao salvar o histórico: ' + error.message);
    }
});

// Rota para exibir o histórico de ações
app.get('/get-history/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const history = await History.find({ userId });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).send('Erro ao buscar histórico: ' + error.message);
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
