// Teste do Projeto Final usando Jest
// Rode com: npm test

const app = require('../src/app');

describe('Projeto Final — servidor', () => {
  test('app é uma função Express válida', () => {
    expect(typeof app).toBe('function');
  });

  test('GET / retorna 404 (nenhuma rota definida ainda)', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(404);
  });
});

const request = require('supertest');
