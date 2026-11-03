# Agentes vs Autocomplete

Entenda a diferença entre um agente de código e um simples autocomplete (copilot).

## Autocomplete (Software 1.5)

- Sugere a próxima linha com base no contexto imediato.
- Você ainda escreve a maior parte do código.
- Você controla cada decisão.
- Exemplo: sugestão inline enquanto você digita.

## Agente de código (Software 2.0)

- Recebe uma tarefa de alto nível ("crie uma API de tarefas").
- Planeja, escreve vários arquivos, roda testes, corrige erros sozinho.
- Você supervisiona e aprova (ou rejeita).
- Exemplo: Claude Code, Cursor Composer, Devin.

| | Autocomplete | Agente |
|---|-------------|--------|
| Escopo | Linha ou bloco | Projeto inteiro |
| Autonomia | Baixa | Alta |
| Seu papel | Escreve + revisão | Revisão + direção |
| Risco | Erro de sintaxe | Dívida técnica, arquitetura ruim |

---

## Quando usar cada um

- **Autocomplete:** funções pequenas, boilerplate, refatoração local.
- **Agente:** scaffolding de projeto, geração de múltiplos arquivos, fluxos de teste e correção.

> Nunca deixe um agente rodar em produção sem revisão humana.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
