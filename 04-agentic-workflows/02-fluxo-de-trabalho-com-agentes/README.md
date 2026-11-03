# Fluxo de Trabalho com Agentes

Um roteiro passo a passo para trabalhar com agentes de código de forma controlada.

## O fluxo recomendado (humano no loop)

```
1. Definir a tarefa
      ↓
2. Escrever prompt claro (contexto, requisitos, restrições)
      ↓
3. Agente gera código e arquivos
      ↓
4. REVISÃO HUMANA (ler, entender, testar)
      ↓
5. Aprovar, pedir alterações ou rejeitar
      ↓
6. Rodar testes e lint
      ↓
7. Commit com mensagem descritiva do que mudou e por quê
```

## Passo 1 — Definir a tarefa

Seja específico. Não diga "faça um site". Diga "crie uma API REST em Node.js com endpoints para criar e listar tarefas, usando SQLite".

## Passo 2 — Prompt claro

Inclua:
- Contexto e objetivo.
- Linguagem/framework/versão.
- Requisitos funcionais.
- Requisitos de não-funcional (segurança, performance).
- Restrições (o que NÃO fazer).

## Passo 3 — Agente gera

Deixe o agente trabalhar. Acompanhe os arquivos criados/modificados.

## Passo 4 — Revisão humana (obrigatória)

Leia cada arquivo gerado. Pergunte:
- Entendo o que cada arquivo faz?
- Há vulnerabilidades de segurança?
- Os testes cobrem os casos importantes?
- O código segue o estilo do projeto?

## Passo 5 — Aprovar / alterar / rejeitar

- **Aprovar:** código está bom, segue em frente.
- **Alterar:** peça mudanças específicas ao agente.
- **Rejeitar:** descarte e reescreva você mesmo, ou reformule o prompt.

## Passo 6 — Testes e lint

Rode:
```bash
npm test        # ou equivalente da sua linguagem
npm run lint    # ou equivalente
```

## Passo 7 — Commit

```bash
git add .
git commit -m "feat: adiciona API de tarefas (revisado humano)
- Endpoints POST /tarefas e GET /tarefas
- Validacao de entrada inclusa
- Testes unitarios com Jest
- Revisado por: [seu nome]"
```

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
