# RELATÓRIO PESSIMISTA — Reavaliação do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Versão anterior:** 3,5/10 → 4,5/10 → 5,5/10 → 5,5/10 (sem melhora)  
**Escopo:** Verificar ponto a ponto se as 14 correções reportadas realmente estão no repositório, e determinar a nota atualizada. Critério: correção só conta se está correta, completa e funcional, não se foi apenas prometida ou tentada.

---

## Verificação das 14 correções reportadas

| # | Correção reportada | Status | Veredito |
|---|-------------------|--------|----------|
| 1 | QA_STUDENT.md com colunas "Como reproduzir", "Resultado esperado", "Resultado atual" | VERDADEIRO | Linha 39 de QA_STUDENT.md tem as 8 colunas completas. Linhas 41-47 preenchem todas. Entregue e funcional. |
| 2 | npm audit mudou para --audit-level=critical (não quebra CI) | VERDADEIRO | package.json do projeto 3, linha 9: "audit": "npm audit --audit-level=critical". Execução local sai com código 0. |
| 3 | Referência ao MOBI removida do downloads/README.md | FALSO | Linha 13 ainda cita MOBI: "Se precisar em outro formato (ex: MOBI para Kindle)..." e comando ebook-convert. Referência viva a formato inexistente. |
| 4 | .eslintrc.json existe no projeto 3 com regras curly, eqeqeq, no-console | PARCIAL | .eslintrc.json existe com as 3 regras. MAS npm run lint falha com 24 erros (no-undef para test e expect) porque não há env: jest. O lint não valida nada; é teatro quebrado. |
| 5 | teste.js plano do projeto 3 removido | VERDADEIRO | teste.js plano não existe mais. Apenas teste/app.test.js (Jest) permanece. |
| 6 | 32 testes passando em todos os 4 projetos (Jest + supertest) | VERDADEIRO | Confirmado por execução: P1=8, P2=10, P3=12, P4=2. Total 32/32 PASSAM. |
| 7 | app.listen() protegido com require.main === module | VERDADEIRO | Projeto 2 (server.js linha 96) e Projeto 4 (src/app.js linha 31) têm a proteção. |
| 8 | Estado isolado nos testes da API (DELETE /itens/limpar-todos + beforeEach) | VERDADEIRO | Projeto 2: server.js expõe DELETE /itens/limpar-todos que reseta itens e proximoId; teste chama no beforeEach. Funciona. |
| 9 | require('supertest') no topo do teste do projeto 4 | VERDADEIRO | Projeto 4 teste/app.test.js linha 4: const request = require('supertest'); no topo. |
| 10 | MOBI removido completamente (README, landing, traduções) | FALSO | landing/index.html linha 457 ainda diz "disponível em EPUB e MOBI". Tradução EN linha 547 também. |
| 11 | .env.example, NOTICE, CONTRIBUTING.md expandido, copyright Apache 2.0 nos .js | VERDADEIRO | .env.example com regras de ouro; NOTICE e CONTRIBUTING.md existem; .js têm cabeçalho Copyright 2026 + Apache 2.0. |
| 12 | Acessibilidade landing: skip-link, aria-label, aria-live | PARCIAL | skip-link e aria-label existem. aria-live NÃO existe em nenhum lugar da landing. Entregue pela metade. |
| 13 | Guia central de npm install no start-here | VERDADEIRO | 00-start-here/01-como-usar-este-repo.md linhas 44-58 explicam npm install antes de rodar qualquer projeto. |
| 14 | TypeScript removido dos pré-requisitos | PARCIAL | 00-start-here/02-pre-requisitos.md linha 7 ainda diz "JavaScript/TypeScript". Linha 17 nega TypeScript. Contradição na linha 7 não resolvida. |

Resumo das 14: 8 verdadeiras, 2 falsas (itens 3 e 10), 4 parciais (itens 4, 10, 12, 14). Metade das correções está incompleta ou não entregue.

---

## Problemas críticos RESOLVIDOS (nesta rodada)

1. QA_STUDENT.md tem as 3 colunas prometidas — Tabela de problemas preenche "Como reproduzir", "Resultado esperado", "Resultado atual" para cada entrada.
2. npm audit com --audit-level=critical — Não quebra CI; saída código 0.
3. teste.js plano do projeto 3 removido — Código morto eliminado; apenas o teste Jest permanece.
4. 32 testes passando (Jest + supertest) — Suíte completa verde em todos os 4 projetos.
5. app.listen() protegido com require.main === module — Projetos 2 e 4 não iniciam servidor durante testes.
6. Estado isolado nos testes da API — beforeEach + DELETE /itens/limpar-todos reseta itens e proximoId.
7. require('supertest') no topo do teste do projeto 4 — Código previsível, sem dependência de hoisting.
8. .env.example, NOTICE, CONTRIBUTING.md, copyright nos .js — Documentação legal e de variáveis de ambiente presente.
9. Guia central de npm install no start-here — Explicado no guia de uso do repositório.
10. MOBI removido do README raiz e da tabela de downloads/README.md — Apenas EPUB listado como download disponível.

---

## Problemas críticos que AINDA PERMANECEM (lista dura)

### 1. Lint é teatro ativamente quebrado (CRÍTICO)
O .eslintrc.json existe com as regras curly, eqeqeq, no-console, mas não declara env: jest. Rodar npm run lint produz 24 erros (no-undef para test e expect). O lint não valida nada do prometido; falha completamente por falta de configuração de ambiente de teste. Um estudante que rode npm run lint verá apenas erros de ambiente, não de código.

### 2. npm audit não tratado — 27 vulnerabilidades (CRÍTICO)
São 27 vulnerabilidades (4 low, 23 moderate) no projeto 3. O --audit-level=critical apenas mascara o problema ao não reportá-las, mas não as corrige. Não houve npm audit fix, nem pinagem de versões, nem avaliação de risco. Qualquer auditoria de segurança real encontra o repositório vulnerável.

### 3. MOBI ainda referenciado na landing e downloads/README (ALTA)
- landing/index.html linha 457 (PT-BR) e linha 547 (EN): texto ainda diz "disponível em EPUB e MOBI".
- downloads/README.md linha 13: ainda cita MOBI e dá comando ebook-convert book.epub book.mobi.
O MOBI não existe como arquivo baixável. O usuário clica esperando um formato que não está lá.

### 4. aria-live ausente na landing (MÉDIO)
A correção reportada incluía aria-live, mas o atributo não existe em nenhum lugar da landing page. Acessibilidade entregue apenas pela metade (skip-link e aria-label sim, aria-live não).

### 5. Pré-requisitos ainda citam TypeScript (BAIXO)
00-start-here/02-pre-requisitos.md linha 7: "Node.js (v18+) e npm — para rodar exemplos de JavaScript/TypeScript". Todo o código é JavaScript puro. Contradição confunde o iniciante.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 20% | 9,0 | Todos passam, isolamento da API funcionando. |
| Correções reportadas realmente implementadas | 20% | 5,0 | Apenas 8 de 14 são totalmente verdadeiras; 2 falsas, 4 parciais. |
| Qualidade do código (lint, ESLint) | 15% | 2,0 | .eslintrc.json existe mas npm run lint falha com 24 erros; sem env: jest. |
| Documentação consistente (README, QA, landing) | 15% | 4,0 | MOBI removido do README raiz mas ainda citado na landing e downloads/README. |
| Segurança (npm audit) | 15% | 2,0 | 27 vulnerabilidades não tratadas; apenas mascaradas por --audit-level=critical. |
| Boas práticas (sem código morto, npm install guiado) | 10% | 4,0 | teste.js removido mas MOBI ainda referenciado e aria-live ausente. |
| **PONDERADA FINAL** | **100%** | **5,5** | |

Nota geral: 5,5 / 10

Não houve melhora em relação à avaliação anterior (5,5/10). Dez itens foram consertados ou melhorados, mas cinco falhas estruturais permanecem exatamente como estavam: lint sem env: jest que falha ao rodar, 27 vulnerabilidades do npm audit não tratadas, MOBI ainda referenciado na landing e downloads/README, aria-live ausente, e contradição de TypeScript nos pré-requisitos. O repositório continua frágil: o lint não roda, a acessibilidade está pela metade, e a documentação promete o que não entrega.

---

## O que exatamente faltaria para chegar a 10/10 (realista)

1. Corrigir o .eslintrc.json adicionando env: jest para que npm run lint realmente valide código e não falhe com 24 erros de ambiente.
2. Tratar as 27 vulnerabilidades do npm audit — executar npm audit fix, avaliar as que exigem --force, e garantir que npm audit --audit-level=moderate saia com código 0. Não basta mascarar com --audit-level=critical.
3. Remover TODA referência ao MOBI da landing/index.html (linhas 457 e 547) e do downloads/README.md (linha 13). Não deixar comando de conversão para formato inexistente.
4. Adicionar aria-live na landing page para completar a acessibilidade prometida.
5. Remover a menção a TypeScript da linha 7 de 00-start-here/02-pre-requisitos.md ou adicionar exemplos reais em TypeScript.
6. Manter os 32 testes passando — garantir que futuras mudanças não quebrem a suíte de testes.

---

## Conclusão

O repositório continua em 5,5 / 10. As correções de superfície (MOBI removido do README raiz, require no topo, isolamento de estado, 32 testes passando, .eslintrc.json criado) estão no lugar, mas falhas estruturais permanecem: lint sem configuração de Jest que falha ao rodar, 27 vulnerabilidades do npm audit não tratadas (apenas mascaradas), MOBI ainda referenciado na landing e downloads/README, aria-live ausente, e contradição de TypeScript nos pré-requisitos. O repositório não está pronto para publicação sem resolver pelo menos os itens 1 a 5 da lista acima.

Caminho do relatório: /Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md
Nota geral: 5,5 / 10
