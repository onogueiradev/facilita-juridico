const services = require('../services');
const nearestNeighbor = require('../utils/nearestNeighbor');
const messages = require('../utils/messages');

const getClients = async (_req, res) => {
  try {
    const result = await services.getClients();
    res.json(
      result?.length > 0 ? result : { message: messages.NO_CLIENTS_MESSAGE }
    );
  } catch (err) {
    console.error(messages.DATABASE_ERROR, err);
    res.status(500).json({ error: messages.DATABASE_ERROR });
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

    if (result?.error) {
      return res.status(400).json({
        error: messages.DUPLICATE_EMAIL_ERROR,
      });
    }
    res.json({ message: messages.CLIENT_CREATED_SUCCESS });
  } catch (err) {
    console.error(messages.INSERT_ERROR, err);
    res.status(500).json({ error: err.message });
  }
};

const visitationOrder = async (_req, res) => {
  try {
    const customers = await services.getClients();
    const order = nearestNeighbor(customers);
    res.json(
      order?.length > 0 ? order : { message: messages.NO_CLIENTS_MESSAGE }
    );
  } catch (err) {
    console.error(messages.DATABASE_ERROR, err);
    res.status(500).json({ error: messages.DATABASE_ERROR });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

  try {
    if (isNaN(id)) {
      return res.status(400).json({ error: messages.ID_NUMBER_ERROR });
    }
    const client = await services.getOneClient(id);
    if (!client) {
      return res.status(404).json({ error: messages.CLIENT_NOT_FOUND_ERROR });
    }
    const result = await services.updateClient(
      id,
      nome,
      email,
      telefone,
      coordenada_x,
      coordenada_y
    );
    if (result?.error) {
      return res.status(400).json({
        error: messages.DUPLICATE_EMAIL_ERROR,
      });
    }
    res.json({ message: messages.CLIENT_UPDATED_SUCCESS });
  } catch (err) {
    console.error(messages.UPDATE_ERROR, err);
    res.status(500).json({ error: messages.UPDATE_ERROR });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      return res.status(400).json({ error: messages.ID_NUMBER_ERROR });
    }
    const client = await services.getOneClient(id);
    if (!client) {
      return res.status(404).json({ error: messages.CLIENT_NOT_FOUND_ERROR });
    }
    await services.deleteClient(id);
    res.json({ message: messages.CLIENT_DELETED_SUCCESS });
  } catch (err) {
    console.error(messages.DELETE_ERROR, err);
    res.status(500).json({ error: messages.DELETE_ERROR });
  }
};

module.exports = {
  getClients,
  createClient,
  visitationOrder,
  updateClient,
  deleteClient,
};
