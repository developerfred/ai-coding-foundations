# Testes e Verificação

Aprenda a verificar se o código gerado por IA realmente funciona e é seguro.

## Por que testes são obrigatórios com IA

A IA pode gerar código que parece correto, mas:
- Falha em casos de borda (array vazio, null, valores negativos).
- Tem comportamento não determinístico.
- Quebra quando a entrada muda.

Testes são sua rede de segurança.

## Tipos de testes para código gerado

| Tipo | O que verifica | Quando usar |
|------|---------------|-------------|
| Unitário | Uma função isolada | Lógica pura, cálculos |
| Integração | Várias peças juntas | API + banco de dados |
| Segurança | Entradas maliciosas | Qualquer código que recebe input do usuário |
| Regressão | Um bug já corrigido não volta | Após cada correção |

## Exemplo: testando uma função gerada

```javascript
// Código gerado: função que desconta preço
function aplicarDesconto(preco, percentual) {
  return preco - (preco * percentual / 100);
}
```

### Testes (Jest)

```javascript
test('aplica desconto de 10%', () => {
  expect(aplicarDesconto(100, 10)).toBe(90);
});

test('desconto de 0% nao altera preco', () => {
  expect(aplicarDesconto(100, 0)).toBe(100);
});

test('desconto de 100% resulta em zero', () => {
  expect(aplicarDesconto(100, 100)).toBe(0);
});

test('percentual invalido lancado erro', () => {
  expect(() => aplicarDesconto(100, 150)).toThrow();
});
```

## Verificação de segurança

Antes de usar código gerado, rode:

- **Lint:** `eslint` ou equivalente da sua linguagem.
- **Análise estática:** `sonarqube`, `snyk`, `codeql`.
- **Dependências:** `npm audit` ou `pip audit` para pacotes vulneráveis.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
