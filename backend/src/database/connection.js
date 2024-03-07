const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'postgres',
  database: 'db_cleaning',
  password: 'postgres',
  port: 5432,
});

module.exports = client;