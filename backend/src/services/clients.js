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

const getOneClient = async (id) => {
  try {
    const result = await client.query('SELECT * FROM clientes WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao consultar o banco de dados', err);
    return { error: 'Erro ao consultar o banco de dados' };
  }
}

const createClient = async (name, email, phone, coordinate_x, coordinate_y) => {
  try {
    const result = await client.query(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, coordinate_x, coordinate_y]
    );
    return result;
  } catch (err) {
    console.error('Erro ao inserir no banco de dados', err);
    return { error: err.message };
  }
};

const updateClient = async (
  id,
  name,
  email,
  phone,
  coordinate_x,
  coordinate_y
) => {
  try {
    const result = await client.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, coordenada_x = $4, coordenada_y = $5 WHERE id = $6',
      [name, email, phone, coordinate_x, coordinate_y, id]
    );
    return result;
  } catch (err) {
    console.error('Erro ao atualizar no banco de dados', err);
    return { error: err.message };
  }
};

const deleteClient = async (id) => {
  try {
    const result = await client.query('DELETE FROM clientes WHERE id = $1', [id]);
    return result;
  } catch (err) {
    console.error('Erro ao deletar no banco de dados', err);
    return { error: err.message };
  }
}

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getOneClient
};
