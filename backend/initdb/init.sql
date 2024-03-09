DROP TABLE IF EXISTS clientes;

CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telefone VARCHAR(255),
  coordenada_x INTEGER,
  coordenada_y INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  clientes (
    nome,
    email,
    telefone,
    coordenada_x,
    coordenada_y
  )
VALUES
  ('João', 'joao@gmail.com', '123456789', 4, 6),
  ('Maria', 'maria@hotmail.com', '987654321', 3, 7),
  ('José', 'jose@gmail.com', '123456789', 2, 8),
  ('Ana', 'ana@hotmail.com', '987654321', 2, 3),
  ('Pedro', 'pedro@yahoo.com', '123456789', 3, 10),
  ('Paula', 'paula@gmail.com', '987654321', 4, 5),
  ('Carlos', 'carlos@gmail.com', '123456789', 5, 6);