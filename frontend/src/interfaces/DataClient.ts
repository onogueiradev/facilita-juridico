export interface DataClient extends DataClientCreate {
  id: number;
};

export interface DataClientCreate {
  nome: string;
  email: string;
  telefone: string;
  coordenada_x: number;
  coordenada_y: number;
};