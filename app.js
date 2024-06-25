const { MongoClient, ServerApiVersion } = require('mongodb');

// Defina sua URI de conexão substituindo <password> pela senha real
const uri = "mongodb+srv://tubfuy:El9erjv3oPjaIqAR@cluster0.zdcrmgs.mongodb.net";

// Cria um cliente MongoClient com opções para configurar a versão da API estável
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Conecta o cliente ao servidor MongoDB
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        // Envie um ping para confirmar uma conexão bem-sucedida
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } finally {
        // Garante que o cliente será fechado quando terminar ou houver erro
        await client.close();
        console.log("Connection closed");
    }
}

run().catch(console.error);
