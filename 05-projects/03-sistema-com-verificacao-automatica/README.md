# Projeto 3 — Sistema com Verificação Automática

Objetivo: construir um pequeno sistema que inclua verificação automática (lint, testes, análise de segurança) integrada ao fluxo de trabalho.

## Estrutura

```
03-sistema-com-verificacao-automatica/
├── calculadora.js
├── teste.js
├── .eslintrc.json
├── package.json
└── README.md
```

## Como rodar

```bash
npm install
npm test        # roda os testes
npm run lint    # roda o lint
npm run audit   # verifica vulnerabilidades
npm run verificar # roda tudo: lint + teste + audit
```

## Código

### package.json

```json
{
  "name": "sistema-verificacao-automatica",
  "version": "1.0.0",
  "description": "Sistema com verificação automática integrada",
  "main": "calculadora.js",
  "scripts": {
    "test": "node teste.js",
    "lint": "eslint calculadora.js teste.js || true",
    "audit": "npm audit --audit-level=moderate || true",
    "verificar": "npm run lint && npm test && npm run audit"
  },
  "devDependencies": {
    "eslint": "^8.40.0"
  }
}
```

### .eslintrc.json

```json
{
  "env": {
    "es2022": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "no-console": "warn",
    "eqeqeq": "error",
    "curly": "error"
  }
}
```

### calculadora.js (revisado por humano)

```javascript
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
```

### teste.js (testes automatizados)

```javascript
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
```

## Script de verificação

Rode `npm run verificar` antes de entregar qualquer código. Ele executa:
1. Lint (ESLint) — qualidade de código.
2. Testes — funcionalidade correta.
3. Audit — vulnerabilidades em dependências.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
