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

const createClient = async (
  name,
  email,
  cpf,
  phone,
  coordinate_x,
  coordinate_y
) => {
  try {
    const result = await client.query(
      'INSERT INTO clientes (nome, email, cpf, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, cpf, phone, coordinate_x, coordinate_y]
    );
    return result;
  } catch (err) {
    console.error('Erro ao inserir no banco de dados', err);
    return { error: 'Erro ao inserir no banco de dados' };
  }
};

module.exports = {
  getClients,
  createClient,
};
