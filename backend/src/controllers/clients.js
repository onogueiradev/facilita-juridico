const services = require('../services');

const getClients = async (req, res) => {
  try {
    const result = await services.getClients();
    res.json(result);
  } catch (err) {
    console.error('Erro ao consultar o banco de dados', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
};

const createClient = async (req, res) => {
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  try {
    const result = await services.createClient(
      nome,
      email,
      telefone,
      coordenada_x,
      coordenada_y
    );
    res.json(result);
  } catch (err) {
    console.error('Erro ao inserir no banco de dados', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getClients,
  createClient,
};
