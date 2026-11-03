/**
 * API REST de Itens — código revisado por humano.
 * Endpoints: GET /itens, POST /itens, GET /itens/:id, DELETE /itens/:id
 * Armazenamento em memória (array). Para produção, usar banco de dados.
 */

const express = require('express');
const app = express();
app.use(express.json());

let itens = [];
let proximoId = 1;

// Middleware de validação de entrada
function validarItem(req, res, next) {
  const { nome, descricao } = req.body;
  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).json({ erro: 'Nome é obrigatório e deve ser uma string não vazia.' });
  }
  if (descricao !== undefined && typeof descricao !== 'string') {
    return res.status(400).json({ erro: 'Descrição deve ser uma string.' });
  }
  next();
}

// GET /itens — listar todos
app.get('/itens', (_req, res) => {
  res.json(itens);
});

// GET /itens/:id — buscar por id
app.get('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  const item = itens.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }
  res.json(item);
});

// POST /itens — criar item
app.post('/itens', validarItem, (req, res) => {
  const item = {
    id: proximoId++,
    nome: req.body.nome.trim(),
    descricao: req.body.descricao ? req.body.descricao.trim() : '',
    criadoEm: new Date().toISOString()
  };
  itens.push(item);
  res.status(201).json(item);
});

// DELETE /itens/:id — remover item
app.delete('/itens/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  const index = itens.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }
  itens.splice(index, 1);
  res.status(204).send();
});

const PORTA = process.env.PORTA || 3000;
app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});

module.exports = { app, itens, proximoId };
