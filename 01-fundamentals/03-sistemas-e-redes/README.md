# Sistemas e Redes

Exercícios clássicos **sem IA** para construir base sólida.

## O que você vai aprender

- Modelo OSI e TCP/IP
- HTTP, requisições e respostas
- DNS e endereçamento IP
- Cliente-servidor

## Exercício: Requisição HTTP com fetch

Faça uma requisição GET para uma API pública e trate a resposta, incluindo erros de rede.

> **Nota:** `fetch` está disponível nativamente no Node.js a partir da **v18+**. Se você estiver em uma versão mais antiga, use uma biblioteca como `node-fetch` ou atualize o Node.js.

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    throw error;
  }
}
```

> **Regra de ouro**: faça esses exercícios **sem IA**. Escreva o código você mesmo, execute, teste e entenda cada linha.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
