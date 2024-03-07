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

module.exports = {
  getClients,
};
