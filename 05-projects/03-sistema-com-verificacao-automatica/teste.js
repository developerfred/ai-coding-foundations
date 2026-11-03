// Testes da Calculadora
const { soma, subtracao, multiplicacao, divisao } = require('./calculadora');

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

// Soma
assert(soma(2, 3) === 5, 'soma(2, 3) === 5');
assert(soma(-1, 1) === 0, 'soma(-1, 1) === 0');
assert(soma(0, 0) === 0, 'soma(0, 0) === 0');

// Subtração
assert(subtracao(5, 3) === 2, 'subtracao(5, 3) === 2');
assert(subtracao(3, 5) === -2, 'subtracao(3, 5) === -2');

// Multiplicação
assert(multiplicacao(2, 3) === 6, 'multiplicacao(2, 3) === 6');
assert(multiplicacao(-2, 3) === -6, 'multiplicacao(-2, 3) === -6');

// Divisão
assert(divisao(6, 3) === 2, 'divisao(6, 3) === 2');
assert(divisao(5, 2) === 2.5, 'divisao(5, 2) === 2.5');

// Erros
function testarErro(fn, nome) {
  try {
    fn();
    assert(false, `${nome} deveria lançar erro`);
  } catch (e) {
    assert(true, `${nome} lança erro`);
  }
}

testarErro(() => soma('a', 1), 'soma com string lança erro');
testarErro(() => divisao(1, 0), 'divisão por zero lança erro');
testarErro(() => soma(NaN, 1), 'soma com NaN lança erro');

console.log(`\n${passou} passou, ${falhou} falhou`);
process.exit(falhou > 0 ? 1 : 0);
