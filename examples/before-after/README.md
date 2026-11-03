# Exemplos Antes e Depois

Mostramos o código antes da revisão humana e depois dela, com o que mudou.

## Exemplo — Função de desconto

### Antes (gerado por IA)

```javascript
function desconto(preco, pct) {
  return preco - (preco * pct / 100);
}
```

**Problemas:** sem validação, sem tipos, aceita qualquer valor (incluindo negativo ou > 100%).

### Depois (revisado por humano)

```javascript
/**
 * Aplica um percentual de desconto sobre um preço.
 * @param {number} preco - Preço original (deve ser >= 0).
 * @param {number} pct - Percentual de desconto (0 a 100).
 * @returns {number} Preço com desconto aplicado.
 * @throws {Error} Se os valores forem inválidos.
 */
function aplicarDesconto(preco, pct) {
  if (typeof preco !== 'number' || typeof pct !== 'number') {
    throw new Error('preco e pct devem ser numeros');
  }
  if (preco < 0) {
    throw new Error('preco nao pode ser negativo');
  }
  if (pct < 0 || pct > 100) {
    throw new Error('pct deve estar entre 0 e 100');
  }
  return preco - (preco * pct / 100);
}
```

### O que mudou

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Validação | Nenhuma | Tipo, intervalo e negócio |
| Documentação | Nenhuma | JSDoc completo |
| Nome da função | `desconto` | `aplicarDesconto` (mais descritivo) |
| Tratamento de erro | Ausente | `throw` com mensagens claras |

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
