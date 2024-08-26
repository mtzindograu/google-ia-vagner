
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mateus:<db_password>@cluster0.9qltb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Conectar ao MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatbotDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

// Definir um esquema e modelo para o histórico de ações
const userActionSchema = new mongoose.Schema({
  action: String,
  timestamp: { type: Date, default: Date.now },
  userId: String,
});

const UserAction = mongoose.model('UserAction', userActionSchema);

// Endpoint para registrar a ação do usuário
app.post('/api/user-action', async (req, res) => {
  const { action, userId } = req.body;

  try {
    const newUserAction = new UserAction({ action, userId });
    await newUserAction.save();
    res.status(201).send('Ação registrada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao registrar ação');
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

