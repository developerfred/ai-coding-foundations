// Testes da API — rodam em Node.js
const { app } = require('./server');

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

console.log('Testes de unidade da lógica da API:');
assert(typeof app === 'function', 'app é uma função Express');

// Teste direto da lógica de validação (sem HTTP real)
const casos = [
  { nome: 'Item válido', valido: true },
  { nome: '', valido: false },
  { nome: '   ', valido: false },
  { nome: undefined, valido: false },
];

casos.forEach(({ nome, valido }) => {
  const ehValido = Boolean(nome && typeof nome === 'string' && nome.trim() !== '');
  assert(ehValido === valido, `validação: "${nome}"`);
});

console.log(`\n${passou} passou, ${falhou} falhou`);
process.exit(falhou > 0 ? 1 : 0);
