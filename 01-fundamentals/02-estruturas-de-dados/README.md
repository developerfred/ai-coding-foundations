# Estruturas de Dados

Exercícios clássicos **sem IA** para construir base sólida.

## O que você vai aprender

- Arrays e listas encadeadas
- Pilhas (stack) e filas (queue)
- Tabelas hash (map/dictionary)
- Árvores binárias

## Exercício: Pilha com array

Implemente uma pilha usando um array, com as operações `push`, `pop` e `peek`.

```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    if (this.isEmpty()) throw new Error('Stack underflow');
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}
```

> **Regra de ouro**: faça esses exercícios **sem IA**. Escreva o código você mesmo, execute, teste e entenda cada linha.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
