# Debug e Correção de Código IA

Aprenda a corrigir código gerado por IA de forma sistemática.

## Fluxo de debug de código gerado

1. **Reproduza o erro.** Rode o código e veja a mensagem exata.
2. **Leia o stack trace.** Identifique em qual linha o erro ocorreu.
3. **Pergunte à IA o que pode estar errado.** Cole o erro e o código, peça sugestões.
4. **Não aceite cegamente.** Teste a correção sugerida pela IA.
5. **Adicione um teste que cobre o erro.** Assim ele não volta.

## Exemplo prático

### Código gerado com bug

```javascript
function calcularMedia(numeros) {
  let soma = 0;
  for (let i = 0; i <= numeros.length; i++) {
    soma += numeros[i];
  }
  return soma / numeros.length;
}
```

**Erro:** `i <= numeros.length` acessa índice fora do array → `undefined` → `NaN`.

### Correção

```javascript
function calcularMedia(numeros) {
  if (!numeros || numeros.length === 0) {
    throw new Error('Lista de números não pode estar vazia');
  }
  let soma = 0;
  for (let i = 0; i < numeros.length; i++) {
    soma += numeros[i];
  }
  return soma / numeros.length;
}
```

### Teste que previne regressão

```javascript
test('calcularMedia lança erro para array vazio', () => {
  expect(() => calcularMedia([])).toThrow('Lista de números não pode estar vazia');
});

test('calcularMedia funciona normalmente', () => {
  expect(calcularMedia([1, 2, 3])).toBe(2);
});
```

---

## Padrões comuns de erro em código IA

| Erro | Causa provável | Correção |
|------|---------------|----------|
| `undefined is not a function` | Método inexistente ou importação faltando | Verificar imports e documentação |
| SQL injection | Variáveis interpoladas na query | Usar parâmetros preparados |
| Senha hardcoded | IA inseriu valor fixo | Usar variáveis de ambiente |
| `any` em TypeScript | IA não inferiu tipos | Definir tipos explícitos |

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
