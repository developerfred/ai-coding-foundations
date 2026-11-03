/**
 * Ponto de entrada do projeto final.
 * Este arquivo deve ser revisado por você linha por linha.
 */

const express = require('express');
const app = express();
app.use(express.json());

// Rotas e lógica vão aqui — revise cada uma

const PORTA = process.env.PORTA || 3000;
app.listen(PORTA, () => {
  console.log(`Projeto final rodando em http://localhost:${PORTA}`);
});

module.exports = app;
