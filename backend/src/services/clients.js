const client = require('../database/connection');

const getClients = async () => {
  try {
    const result = await client.query('SELECT * FROM clientes');
    return result.rows;
  } catch (err) {
    console.error('Erro ao consultar o banco de dados', err);
    return { error: 'Erro ao consultar o banco de dados' };
  }
};

module.exports = {
  getClients,
};
