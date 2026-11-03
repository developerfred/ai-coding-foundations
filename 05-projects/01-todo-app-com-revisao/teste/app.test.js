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

// Testes do Todo App usando Jest (framework de teste real)
// Rode com: npm test

// Simulamos o DOM mínimo para testar a lógica
global.document = {
  getElementById: () => ({
    addEventListener: () => {},
    value: '',
    innerHTML: '',
    textContent: '',
    className: '',
    appendChild: () => {},
    preventDefault: () => {}
  })
};

let tarefas = [];
let mensagens = [];

function salvar() {}
function mostrarMensagem(texto, tipo = 'sucesso') {
  mensagens.push({ texto, tipo });
}
function renderizar() {}
function adicionar(texto) {
  if (!texto || texto.trim() === '') {
    mostrarMensagem('Tarefa não pode estar vazia.', 'erro');
    return;
  }
  if (texto.trim().length > 200) {
    mostrarMensagem('Tarefa muito longa (máximo 200 caracteres).', 'erro');
    return;
  }
  tarefas.push({ texto: texto.trim(), concluida: false });
  salvar();
  renderizar();
  mostrarMensagem('Tarefa adicionada.');
}
function remover(index) {
  if (index < 0 || index >= tarefas.length) return;
  tarefas.splice(index, 1);
  salvar();
  renderizar();
  mostrarMensagem('Tarefa removida.');
}
function toggleConcluida(index) {
  if (index < 0 || index >= tarefas.length) return;
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}

describe('Todo App — lógica de negócio', () => {
  beforeEach(() => {
    tarefas = [];
    mensagens = [];
  });

  test('adiciona uma tarefa válida', () => {
    adicionar('Estudar JavaScript');
    expect(tarefas.length).toBe(1);
    expect(tarefas[0].texto).toBe('Estudar JavaScript');
    expect(tarefas[0].concluida).toBe(false);
  });

  test('não adiciona tarefa vazia', () => {
    adicionar('');
    adicionar('   ');
    expect(tarefas.length).toBe(0);
    expect(mensagens.some(m => m.tipo === 'erro')).toBe(true);
  });

  test('não adiciona tarefa maior que 200 caracteres (caso de borda)', () => {
    const longa = 'a'.repeat(201);
    adicionar(longa);
    expect(tarefas.length).toBe(0);
    expect(mensagens.some(m => m.tipo === 'erro')).toBe(true);
  });

  test('marca tarefa como concluída', () => {
    adicionar('Tarefa 1');
    toggleConcluida(0);
    expect(tarefas[0].concluida).toBe(true);
    toggleConcluida(0);
    expect(tarefas[0].concluida).toBe(false);
  });

  test('não marca índice inválido como concluída (caso de borda)', () => {
    toggleConcluida(999);
    expect(tarefas.length).toBe(0);
  });

  test('remove tarefa pelo índice', () => {
    adicionar('Tarefa 1');
    adicionar('Tarefa 2');
    remover(0);
    expect(tarefas.length).toBe(1);
    expect(tarefas[0].texto).toBe('Tarefa 2');
  });

  test('não remove com índice inválido (caso de borda)', () => {
    adicionar('Tarefa 1');
    remover(999);
    remover(-1);
    expect(tarefas.length).toBe(1);
  });

  test('não remove índice negativo (caso de borda)', () => {
    adicionar('Tarefa 1');
    remover(-1);
    expect(tarefas.length).toBe(1);
  });
});
