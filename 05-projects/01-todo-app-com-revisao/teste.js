// Testes do Todo App — rodam em Node.js
// Requer: node teste.js

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
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}

let passou = 0;
let falhou = 0;

function assert(condicao, nome) {
  if (condicao) {
    console.log(`✅ ${nome}`);
    passou++;
  } else {
    console.error(`❌ ${nome}`);
    falhou++;
  }
}

// 1. Adicionar tarefa válida
adicionar('Estudar JavaScript');
assert(tarefas.length === 1, 'adiciona uma tarefa');
assert(tarefas[0].texto === 'Estudar JavaScript', 'texto da tarefa está correto');
assert(tarefas[0].concluida === false, 'tarefa começa não concluída');

// 2. Não adicionar tarefa vazia
mensagens = [];
adicionar('');
adicionar('   ');
assert(tarefas.length === 1, 'não adiciona tarefa vazia');
assert(mensagens.some(m => m.tipo === 'erro'), 'exibe erro para tarefa vazia');

// 3. Marcar como concluída
toggleConcluida(0);
assert(tarefas[0].concluida === true, 'marca tarefa como concluída');
toggleConcluida(0);
assert(tarefas[0].concluida === false, 'desmarca tarefa');

// 4. Remover tarefa
adicionar('Outra tarefa');
remover(0);
assert(tarefas.length === 1, 'remove tarefa pelo índice');
assert(tarefas[0].texto === 'Outra tarefa', 'removeu a tarefa correta');

// 5. Índice inválido não remove
remover(999);
assert(tarefas.length === 1, 'não remove com índice inválido');

console.log(`\n${passou} passou, ${falhou} falhou`);
process.exit(falhou > 0 ? 1 : 0);
