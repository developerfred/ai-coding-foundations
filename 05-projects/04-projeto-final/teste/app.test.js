// Teste inicial do projeto final (placeholder)
// Substitua por testes reais do seu projeto.

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

assert(true, 'Projeto final criado com estrutura básica');
assert(typeof require === 'function', 'Node.js disponível');

console.log(`\n${passou} passou, ${falhou} falhou`);
process.exit(falhou > 0 ? 1 : 0);
