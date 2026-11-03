/**
 * Calculadora simples — código revisado por humano.
 * Operações: soma, subtração, multiplicação, divisão.
 * Inclui validação de entrada e tratamento de erro.
 */

function validarNumero(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) {
    throw new Error('Valor deve ser um número finito.');
  }
}

function soma(a, b) {
  validarNumero(a);
  validarNumero(b);
  return a + b;
}

function subtracao(a, b) {
  validarNumero(a);
  validarNumero(b);
  return a - b;
}

function multiplicacao(a, b) {
  validarNumero(a);
  validarNumero(b);
  return a * b;
}

function divisao(a, b) {
  validarNumero(a);
  validarNumero(b);
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

module.exports = { soma, subtracao, multiplicacao, divisao };
