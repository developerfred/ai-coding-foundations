# RELATÓRIO PESSIMISTA — Reavaliação do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Versão anterior:** 3,5/10 → 4,5/10 → 5,5/10 → **atual**  
**Escopo:** Verificar ponto a ponto se as 8 correções reportadas realmente estão no repositório, e determinar a nota atualizada. Critério: correção só conta se está **correta, completa e funcional**, não se foi apenas "prometida" ou "tentada".

---

## Verificação das 8 correções reportadas

| # | Correção reportada | Status | Veredito |
|---|-------------------|--------|----------|
| 1 | MOBI removido de todos os lugares (README raiz, landing/index.html, traduções EN/PT-BR) | ✅ VERDADEIRO | Confirmado: README (raiz) lista apenas `book.epub` na árvore; landing/index.html tem apenas card EPUB; traduções PT-BR e EN têm apenas chaves `downloads.epub`. Nenhuma referência funcional a `book.mobi` permanece. O `downloads/README.md` menciona MOBI apenas como "removido temporariamente" com instruções de conversão via Calibre — é informativo, não link quebrado. |
| 2 | `.eslintrc.json` criado no projeto 3 com regras curly, eqeqeq, no-console | ❌ FALSO | `glob **/.eslintrc*` retornou **vazio**. Não existe `.eslintrc.json` em nenhum lugar do repositório. O `package.json` do projeto 3 define `"lint": "eslint calculadora.js teste/app.test.js"`, mas rodar o lint produz **24 erros** (todos `no-undef` para `test` e `expect`, porque não há config que defina globals do Jest). O lint é teatro: não valida nada prometido. |
| 3 | Estado isolado nos testes da API (DELETE /itens/limpar-todos + beforeEach) | ✅ VERDADEIRO | `server.js` expõe `DELETE /itens/limpar-todos` que reseta `itens = []` **e** `proximoId = 1`. O `beforeEach` do teste chama esse endpoint. O estado ISOLADO funciona. `proximoId` é resetado entre testes. |
| 4 | `require('supertest')` movido para o topo do teste do projeto 4 | ✅ VERDADEIRO | `05-projects/04-projeto-final/teste/app.test.js` linha 4: `const request = require('supertest');` — está no topo, antes de qualquer uso. Código limpo e previsível. |
| 5 | `teste.js` planos removidos (código morto) | ❌ FALSO | `05-projects/03-sistema-com-verificacao-automatica/teste.js` **ainda existe** com 49 linhas de testes baseados em `assert` caseiro. Código morto duplicado que confunde estudantes. |
| 6 | Todos os 32 testes passando (Jest + supertest) | ✅ VERDADEIRO | Confirmado por execução: Projeto 1 = 8 passando, Projeto 2 = 10 passando, Projeto 3 = 12 passando, Projeto 4 = 2 passando. Total 32/32 PASSAM. |
| 7 | QA_STUDENT.md com colunas "Como reproduzir", "Resultado esperado", "Resultado atual" | ❌ FALSO | A tabela de problemas do QA_STUDENT.md tem colunas: Módulo \| Seção \| Dúvida / Problema \| Sugestão de correção \| Prioridade. As 3 colunas prometidas **não existem**. A instrução no topo do documento até menciona essas colunas, mas a tabela real não as tem. |
| 8 | Vulnerabilidades do npm audit tratadas (GitHub reportou 8: 4 moderate, 4 low) | ❌ FALSO | Execução local do `npm audit --audit-level=moderate` no projeto 3 reporta **27 vulnerabilidades (4 low, 23 moderate)** e sai com código 1 (falha). Não há `|| true` mas também não há correção. Qualquer CI que rode `npm audit` quebrará. As vulnerabilidades não são tratadas; apenas o mascaramento `|| true` foi removido, o que expõe o problema sem resolvê-lo. |

**Resumo das 8:** 4 verdadeiras, 4 falsas. Metade das correções reportadas não está implementada.

---

## Problemas críticos RESOLVIDOS (desde a avaliação anterior)

1. **MOBI removido do README raiz, landing e traduções** — Não há mais card "Baixar MOBI" nem links para `downloads/book.mobi`. O EPUB é o único formato disponível para download.
2. **`require('supertest')` no topo do teste do projeto 4** — Código já não depende de hoisting acidental de `require`.
3. **Estado isolado nos testes da API** — `DELETE /itens/limpar-todos` reseta `itens` e `proximoId`; `beforeEach` garante isolamento entre testes.
4. **Todos os 32 testes passam** — Jest + supertest rodando corretamente em todos os 4 projetos.

---

## Problemas críticos que AINDA PERMANECEM (lista dura)

### 1. Lint é teatro ativamente quebrado (CRÍTICO)
O `package.json` do projeto 3 define `"lint": "eslint calculadora.js teste/app.test.js"`, mas **não existe `.eslintrc.json`** em nenhum lugar do repositório. Rodar `npm run lint` produz **24 erros** (`no-undef` para `test` e `expect`), ou seja, o lint não apenas não valida `curly`, `eqeqeq`, `no-console` como prometido — ele **falha completamente** por falta de configuração. Um estudante que rode `npm run lint` verá apenas erros de ambiente, não de código.

### 2. npm audit não tratado — CI quebrará (CRÍTICO)
São **27 vulnerabilidades** (4 low, 23 moderate) no projeto 3. O `npm audit --audit-level=moderate` sai com código de saída 1. Com o `|| true` removido, qualquer pipeline de CI que rode esse comando quebrará. Não houve correção de dependências, nem pinagem, nem avaliação de risco. O problema foi apenas exposto, não resolvido.

### 3. QA_STUDENT.md não tem as colunas prometidas (CRÍTICO)
O documento instrui o aluno a preencher com "Como reproduzir | Resultado esperado | Resultado atual", mas a tabela real tem apenas 5 colunas (Módulo, Seção, Dúvida/Problema, Sugestão de correção, Prioridade). As 3 colunas prometidas **não existem**. É um documento que promete uma estrutura e não entrega.

### 4. `teste.js` plano ainda existe (código morto) (ALTA)
`05-projects/03-sistema-com-verificacao-automatica/teste.js` persiste com 49 linhas de testes baseados em `assert` caseiro. É código morto duplicado ao lado do `teste/app.test.js` (Jest). Confunde estudantes e contradiz a afirmação de que foi removido.

### 5. `downloads/README.md` ainda menciona MOBI (MÉDIO)
Mesmo dizendo que o MOBI foi "removido temporariamente", o arquivo ainda referencia `book.mobi` e dá comando `ebook-convert book.epub book.mobi`. É uma referência viva a um formato que não está disponível.

### 6. Nenhum guia central de `npm install` (MÉDIO)
Não há instrução na raiz do repositório dizendo que `npm install` é obrigatório antes de rodar qualquer projeto. Um estudante iniciante que execute `node server.js` no projeto 2 receberá `Cannot find module 'express'` sem saber por quê.

### 7. Pré-requisitos citam TypeScript, mas não há TypeScript (BAIXO)
`00-start-here/02-pre-requisitos.md` menciona TypeScript, mas todo o código é JavaScript puro.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 20% | 9,0 | Todos passam, isolamento da API funcionando. |
| Correções reportadas realmente implementadas | 20% | 5,0 | Apenas 4 de 8 estão corretas; metade é falsa. |
| Qualidade do código (lint, ESLint) | 15% | 2,0 | `.eslintrc.json` não existe; `npm run lint` falha com 24 erros. |
| Documentação consistente (README, QA, landing) | 15% | 4,0 | MOBI removido do README/landing ✅, mas QA_STUDENT.md sem colunas prometidas ❌. |
| Segurança (npm audit) | 15% | 2,0 | 27 vulnerabilidades não tratadas; `npm audit` quebra CI. |
| Boas práticas (sem código morto, `npm install` guiado) | 10% | 4,0 | `teste.js` ainda existe; sem guia central de instalação. |
| **PONDERADA FINAL** | **100%** | **5,5** | |

**Nota geral: 5,5 / 10**

Não houve melhora em relação à avaliação anterior (5,5/10). Três itens que estavam quebrados foram consertados (MOBI, ordem do `require`, isolamento de estado da API), mas quatro itens críticos continuam exatamente como estavam (lint sem config, npm audit não tratado, QA sem colunas, `teste.js` ainda presente). O repositório continua frágil: o lint não roda, o CI quebra no audit, e a documentação promete o que não entrega.

---

## O que exatamente faltaria para chegar a 10/10

1. **Criar `.eslintrc.json` no projeto 3** (e idealmente em todos os projetos) com as regras prometidas (`curly`, `eqeqeq`, `no-console`) e env Jest, para que `npm run lint` realmente valide código e não falhe com 24 erros de ambiente.
2. **Tratar as 27 vulnerabilidades do npm audit** — executar `npm audit fix`, avaliar as que exigem `--force` (breaking change), e garantir que `npm audit --audit-level=moderate` saia com código 0. Não basta remover `|| true`; tem que corrigir.
3. **Adicionar as 3 colunas ao QA_STUDENT.md** — "Como reproduzir", "Resultado esperado", "Resultado atual" na tabela de problemas, conforme prometido na instrução do documento.
4. **Remover o `teste.js` plano do projeto 3** — eliminar o código morto duplicado que confunde estudantes.
5. **Adicionar guia central de `npm install`** — no `README.md` raiz ou `00-start-here/`, explicando que dependências devem ser instaladas antes de rodar qualquer projeto.
6. **Remover referência ao MOBI do `downloads/README.md`** — ou deixar apenas um aviso claro sem comandos de conversão para formato inexistente.
7. **Alinhar pré-requisitos com a realidade** — remover menção a TypeScript ou adicionar exemplos reais em TypeScript.
8. **Manter os 32 testes passando** — garantir que futuras mudanças não quebrem a suíte de testes.

---

## Conclusão

O repositório continua em **5,5 / 10**. As correções de superfície (MOBI removido, `require` no topo, isolamento de estado, 32 testes passando) estão no lugar, mas falhas estruturais permanecem: lint sem configuração que falha ao rodar, 27 vulnerabilidades do npm audit não tratadas (CI quebrará), QA_STUDENT.md sem as colunas prometidas, e `teste.js` plano ainda presente como código morto. O repositório não está pronto para publicação sem resolver pelo menos os itens 1 a 4 da lista acima.

**Caminho do relatório:** `/Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md`  
**Nota geral:** 5,5 / 10
