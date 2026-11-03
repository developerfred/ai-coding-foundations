# Algoritmos e Complexidade

Exercícios clássicos **sem IA** para construir base sólida.

## O que você vai aprender

- Notação Big O
- Complexidade de tempo e espaço
- Análise de algoritmos de busca e ordenação

## Exercício 1: Busca linear vs binária

Implemente uma busca linear e uma busca binária em um array ordenado. Compare a quantidade de operações para diferentes tamanhos de entrada.

```javascript
// Busca linear - O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Busca binária - O(log n)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

## Exercício 2: Ordenação bolha vs ordenação rápida

Implemente Bubble Sort (O(n²)) e Quick Sort (O(n log n) médio). Meça o tempo de execução para arrays de 1.000, 10.000 e 100.000 elementos.

> **Regra de ouro**: faça esses exercícios **sem IA**. Escreva o código você mesmo, execute, teste e entenda cada linha.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
