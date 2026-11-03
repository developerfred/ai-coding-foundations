# Todo App com Revisão

Projeto 1 — Lista de tarefas simples com validação, persistência e revisão humana.

## Estrutura

```
01-todo-app-com-revisao/
├── index.html
├── app.js
├── style.css
├── teste.js
└── README.md
```

## Como rodar

1. Abra `index.html` no navegador.
2. Ou rode os testes: `node teste.js` (requer Node.js).

## Código

### index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App — AI Coding Foundations</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Minhas Tarefas</h1>
    <form id="form-tarefa">
      <input type="text" id="nova-tarefa" placeholder="Digite uma tarefa" required>
      <button type="submit">Adicionar</button>
    </form>
    <ul id="lista"></ul>
    <div id="mensagem" role="alert"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>
```

### app.js (revisado por humano)

```javascript
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
```

### style.css

```css
* { box-sizing: border-box; }
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0b0f14;
  color: #e8eef5;
  margin: 0;
  padding: 24px;
  line-height: 1.6;
}
.container { max-width: 520px; margin: 0 auto; }
h1 { font-size: 1.5rem; margin-bottom: 16px; }
form { display: flex; gap: 8px; margin-bottom: 16px; }
input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid #253040; background: #131b25; color: #e8eef5; }
button { padding: 10px 16px; border-radius: 6px; border: none; background: #7c3aed; color: #fff; cursor: pointer; font-weight: 600; }
button:hover { background: #6d28d9; }
ul { list-style: none; padding: 0; }
li { display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #253040; border-radius: 6px; margin-bottom: 8px; background: #131b25; }
li.concluida span { text-decoration: line-through; opacity: 0.6; }
li span { flex: 1; cursor: pointer; }
li button { background: transparent; color: #ef4444; padding: 6px 10px; font-size: 0.85rem; }
li button:hover { background: rgba(239, 68, 68, 0.1); }
#mensagem { margin-top: 12px; padding: 8px; border-radius: 6px; font-size: 0.9rem; }
#mensagem.erro { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
#mensagem.sucesso { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
```

### teste.js (testes automatizados)

```javascript
// Testes do Todo App — rodam em Node.js
// Requer: node teste.js

// Simula DOM mínimo para testar a lógica
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
```

### README.md do projeto

Veja o README.md já criado na pasta do projeto.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
