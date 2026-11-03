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

/**
 * Todo App — código revisado por humano.
 * Funcionalidades: adicionar, listar, remover, marcar como concluída.
 * Persistência: localStorage.
 */

const form = document.getElementById('form-tarefa');
const input = document.getElementById('nova-tarefa');
const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function mostrarMensagem(texto, tipo = 'sucesso') {
  mensagem.textContent = texto;
  mensagem.className = tipo;
  setTimeout(() => { mensagem.textContent = ''; }, 3000);
}

function renderizar() {
  lista.innerHTML = '';
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.className = tarefa.concluida ? 'concluida' : '';

    const span = document.createElement('span');
    span.textContent = tarefa.texto;
    span.addEventListener('click', () => toggleConcluida(index));

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.type = 'button';
    btnRemover.addEventListener('click', () => remover(index));

    li.appendChild(span);
    li.appendChild(btnRemover);
    lista.appendChild(li);
  });
}

function adicionar(texto) {
  if (!texto || texto.trim() === '') {
    mostrarMensagem('Tarefa não pode estar vazia.', 'erro');
    return;
  }
  tarefas.push({ texto: texto.trim(), concluida: false });
  salvar();
  renderizar();
  input.value = '';
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
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  adicionar(input.value);
});

renderizar();

// Exporta para teste em Node.js (quando rodado fora do navegador)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { adicionar, remover, toggleConcluida, tarefas };
}
