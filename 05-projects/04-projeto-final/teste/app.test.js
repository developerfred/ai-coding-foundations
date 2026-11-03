/*
 * Copyright 2026 codingsh <codingsh@pm.me>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Teste do Projeto Final usando Jest
// Rode com: npm test

const request = require('supertest');
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
