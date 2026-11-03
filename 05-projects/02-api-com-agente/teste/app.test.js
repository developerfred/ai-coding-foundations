// Testes da API usando Jest + Supertest
// Rode com: npm test

const request = require('supertest');
const { app } = require('../server');

describe('API de Itens', () => {
  beforeEach(() => {
    // Limpa os itens antes de cada teste
    app.locals.itens = [];
  });

  test('GET /itens retorna lista vazia inicialmente', async () => {
    const res = await request(app).get('/itens');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /itens cria um item com status 201', async () => {
    const res = await request(app)
      .post('/itens')
      .send({ nome: 'Item 1', descricao: 'Primeiro item' });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe('Item 1');
    expect(res.body.descricao).toBe('Primeiro item');
    expect(res.body.id).toBeDefined();
    expect(res.body.criadoEm).toBeDefined();
  });

  test('POST /itens rejeita nome vazio com status 400', async () => {
    const res = await request(app)
      .post('/itens')
      .send({ nome: '' });
    expect(res.status).toBe(400);
    expect(res.body.erro).toBeDefined();
  });

  test('POST /itens rejeita nome ausente com status 400', async () => {
    const res = await request(app)
      .post('/itens')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /itens rejeita nome apenas espaços com status 400', async () => {
    const res = await request(app)
      .post('/itens')
      .send({ nome: '   ' });
    expect(res.status).toBe(400);
  });

  test('GET /itens/:id retorna o item correto', async () => {
    const criado = await request(app)
      .post('/itens')
      .send({ nome: 'Item Teste' });
    const id = criado.body.id;

    const res = await request(app).get(`/itens/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.nome).toBe('Item Teste');
  });

  test('GET /itens/:id retorna 404 para item inexistente', async () => {
    const res = await request(app).get('/itens/9999');
    expect(res.status).toBe(404);
  });

  test('GET /itens/:id retorna 400 para ID inválido', async () => {
    const res = await request(app).get('/itens/abc');
    expect(res.status).toBe(400);
  });

  test('DELETE /itens/:id remove o item com status 204', async () => {
    const criado = await request(app)
      .post('/itens')
      .send({ nome: 'Para remover' });
    const id = criado.body.id;

    const res = await request(app).delete(`/itens/${id}`);
    expect(res.status).toBe(204);

    // Confirma que foi removido
    const res2 = await request(app).get(`/itens/${id}`);
    expect(res2.status).toBe(404);
  });

  test('DELETE /itens/:id retorna 404 para item inexistente', async () => {
    const res = await request(app).delete('/itens/9999');
    expect(res.status).toBe(404);
  });
});
