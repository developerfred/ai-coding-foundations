/*
 * Copyright 2026 codingsh <codingsh <codingsh@pm.me>
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

// Teste da Calculadora usando Jest (framework de teste real)
// Rode com: npm test

const { soma, subtracao, multiplicacao, divisao } = require('../calculadora');

test('soma(2, 3) === 5', () => {
  expect(soma(2, 3)).toBe(5);
});

test('soma(-1, 1) === 0', () => {
  expect(soma(-1, 1)).toBe(0);
});

test('soma(0, 0) === 0', () => {
  expect(soma(0, 0)).toBe(0);
});

test('subtracao(5, 3) === 2', () => {
  expect(subtracao(5, 3)).toBe(2);
});

test('subtracao(3, 5) === -2', () => {
  expect(subtracao(3, 5)).toBe(-2);
});

test('multiplicacao(2, 3) === 6', () => {
  expect(multiplicacao(2, 3)).toBe(6);
});

test('multiplicacao(-2, 3) === -6', () => {
  expect(multiplicacao(-2, 3)).toBe(-6);
});

test('divisao(6, 3) === 2', () => {
  expect(divisao(6, 3)).toBe(2);
});

test('divisao(5, 2) === 2.5', () => {
  expect(divisao(5, 2)).toBe(2.5);
});

test('soma com string lança erro', () => {
  expect(() => soma('a', 1)).toThrow('Valor deve ser um número finito.');
});

test('divisão por zero lança erro', () => {
  expect(() => divisao(1, 0)).toThrow('Divisão por zero não é permitida.');
});

test('soma com NaN lança erro', () => {
  expect(() => soma(NaN, 1)).toThrow('Valor deve ser um número finito.');
});
