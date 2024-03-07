const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const client = require('./database/connection');
const router = require('./routes/routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida com o banco de dados');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

app.use('/clients', router);
