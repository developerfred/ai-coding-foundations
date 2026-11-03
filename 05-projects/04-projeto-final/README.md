# Projeto 4 — Projeto Final

Objetivo: aplicar tudo que aprendeu em um projeto completo, do início ao fim, com revisão humana rigorosa.

## Estrutura sugerida

```
04-projeto-final/
├── src/
│   ├── app.js
│   ├── validacao.js
│   └── persistencia.js
├── teste/
│   └── app.test.js
├── .eslintrc.json
├── package.json
└── README.md
```

## Requisitos obrigatórios

1. **Fundamentos:** código bem estruturado, sem pular algoritmos/estruturas de dados quando relevante.
2. **IA como ferramenta:** você usou IA para gerar partes, mas revisou cada linha.
3. **Revisão > Geração:** você sabe por que cada decisão foi tomada.
4. **Testes:** suíte de testes passando.
5. **Segurança:** sem segredos hardcoded, entrada validada.
6. **Transparência:** documentar o que a IA gerou e o que você alterou.

## Exemplo de ponto de partida (src/app.js revisado)

```javascript
/**
 * Ponto de entrada do projeto final.
 * Este arquivo deve ser revisado por você linha por linha.
 */

const express = require('express');
const app = express();
app.use(express.json());

// Rotas e lógica vão aqui — revise cada uma

const PORTA = process.env.PORTA || 3000;
app.listen(PORTA, () => {
  console.log(`Projeto final rodando em http://localhost:${PORTA}`);
});

module.exports = app;
```

## Entregáveis

- Código funcional no repositório.
- `README.md` do projeto com:
  - O que o projeto faz.
  - Como rodar.
  - O que a IA gerou vs o que você revisou.
  - Testes e como rodá-los.
- Checklist de revisão humana preenchido.
- Commit com mensagem descritiva.

---

## Checklist final do projeto

| Item | Status |
|------|--------|
| Código roda sem erros | ⬜ |
| Testes passando | ⬜ |
| Lint passando | ⬜ |
| Nenhum segredo hardcoded | ⬜ |
| Entrada validada | ⬜ |
| Você explica cada arquivo | ⬜ |
| README documenta IA vs humano | ⬜ |

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
