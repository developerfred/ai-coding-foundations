# Checklist de Revisão Humana — Exemplo Preenchido

Este é um exemplo de como preencher o checklist após revisar código gerado por IA.

## Projeto: Todo App (01-todo-app-com-revisao)

Revisor: aluno-piloto  
Data: 03/11/2026  
Arquivo revisado: `app.js`

| Item | Status | Observações |
|------|--------|-------------|
| Código roda sem erros | ✅ | Testado no navegador e com `node teste.js`. |
| Testes passando | ✅ | Todos os 8 testes passam. |
| Lint passando | ✅ | ESLint sem erros. |
| Sem segredos hardcoded | ✅ | Não há senhas/tokens no código. |
| Entrada validada | ✅ | Tarefa vazia é rejeitada com mensagem de erro. |
| Tratamento de erro | ✅ | `try/catch` não foi necessário (lógica síncrona), mas validação de entrada cobre os casos. |
| Código comentado | ✅ | Cada função tem comentário explicando o propósito. |
| Você explica cada arquivo | ✅ | Consigo explicar o fluxo: formulário → adicionar → salvar → renderizar. |
| Consigo manter sozinho | ✅ | Se a IA sumir amanhã, consigo manter este código. |

## O que a IA gerou vs o que eu revisei

| Parte | Gerado por IA | Revisado por humano | Mudanças |
|-------|--------------|---------------------|----------|
| Estrutura HTML | Sim | Sim | Adicionou `role="alert"` na mensagem, labels semânticos. |
| Lógica de adicionar | Sim | Sim | Adicionou validação de entrada vazia e mensagem de erro. |
| Persistência localStorage | Sim | Sim | Extraiu para função `salvar()` reutilizável. |
| Remoção de tarefa | Não | Sim | Adicionado pelo revisor (a IA não gerou). |
| Marcar como concluída | Não | Sim | Adicionado pelo revisor. |
| Testes | Não | Sim | Escritos do zero pelo revisor. |

## Problemas encontrados e corrigidos

1. **Problema:** A versão inicial da IA não tinha validação de entrada vazia.
   **Correção:** Adicionada verificação `if (!texto || texto.trim() === '')` antes de adicionar.

2. **Problema:** Não havia como remover tarefas.
   **Correção:** Adicionado botão "Remover" e função `remover(index)`.

3. **Problema:** Não havia persistência — ao recarregar a página, as tarefas sumiam.
   **Correção:** Adicionado `localStorage` com funções `salvar()` e leitura inicial.

## Assinatura do revisor

aluno-piloto — 03/11/2026

> "Revisei cada linha deste código e consigo explicá-lo. Assumo responsabilidade pelo que está entregue."

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
