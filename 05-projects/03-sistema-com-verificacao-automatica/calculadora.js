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
