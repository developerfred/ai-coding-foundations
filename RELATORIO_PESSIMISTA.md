# RELATÓRIO PESSIMISTA — Reavaliação Definitiva do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Repositório:** /Volumes/MASS/ai-code-foundation/  
**Histórico de notas:** 3,5 → 4,5 → 5,5 → 5,5 → 6,0 → 4,5 → **4,5/10**  
**Escopo:** Verificar ponto a ponto se as 10 correções reportadas estão realmente aplicadas e funcionais. Critério: correção só conta se está correta, completa e funcional, não se foi apenas prometida.

---

## Verificação das 10 correções reportadas

| # | Correção reportada | Status | Veredito |
|---|-------------------|--------|----------|
| 1 | QA_STUDENT.md: removidas TODAS as referências ao MOBI | ❌ FALHA | grep por MOBI no repositório retorna apenas: o próprio RELATORIO_PESSIMISTA.md antigo e **QA_STUDENT.md linha 56** ("- Download MOBI disponível? Não — apenas EPUB."). A linha 23 foi ajustada, mas a 56 ainda cita MOBI. A correção "TODAS as referências" NÃO foi entregue. |
| 2 | ESLint removido completamente de todos os 4 projetos (sem .eslintrc.json, sem script lint) | ✅ VERDADEIRO (arquivos) | Nenhum dos 4 package.json tem dependência eslint nem script lint. Nenhum .eslintrc.json existe nos projetos. ENTREGUE nos arquivos reais. PORÉM: READMEs dos projetos 03 e 04 e o docs do módulo 03 ainda REFERENCIAM .eslintrc.json, `"lint": "eslint ..."` e `"eslint": "^8.40.0"`. Documentação não atualizada. |
| 3 | npm audit com --audit-level=critical (não quebra CI) | ⚠️ PARCIAL / MÁSCARA | O script `"audit": "npm audit --audit-level=critical"` existe no projeto 3 e sai com código 0. MAS: foram encontradas **32 vulnerabilidades (2 low, 24 moderate, 4 high, 2 critical)** — incluindo critical de form-data-like e outras. Nenhuma corrigida (`npm audit fix` nunca rodado; o próprio output diz "fix available via npm audit fix"). É máscara, não correção. |
| 4 | aria-live="polite" na seção de downloads da landing | ✅ VERDADEIRO | landing/index.html linha 453: `<section id="downloads" aria-live="polite">`. Subtítulo diz apenas "EPUB" (sem MOBI). Entregue e funcional. |
| 5 | TypeScript removido dos pré-requisitos | ✅ VERDADEIRO | 00-start-here/02-pre-requisitos.md linha 17: "Todo o código do repositório está em JavaScript puro. Nenhuma dependência de TypeScript." Entregue. |
| 6 | MOBI removido completamente de todos os lugares (README, landing, downloads, QA_STUDENT) | ❌ FALHA | Landing e downloads/README estão limpos (apenas EPUB). PORÉM QA_STUDENT.md linha 56 ainda cita MOBI. Não foi removido de "todos os lugares". |
| 7 | 32 testes Jest passando em todos os 4 projetos | ✅ VERDADEIRO (verificado) | Executado localmente: Projeto 1 = 8, Projeto 2 = 10, Projeto 3 = 12, Projeto 4 = 2. **Total 32/32 passam, exit code 0.** Este é o único ponto forte real do repositório. |
| 8 | app.listen() protegido com require.main === module | ✅ VERDADEIRO | 05-projects/02-api-com-agente/server.js linha 96: `if (require.main === module) {` com app.listen na linha 98 DENTRO do bloco. 05-projects/04-projeto-final/src/app.js linha 31 com app.listen na linha 33 DENTRO do bloco. |
| 9 | .env.example, NOTICE, CONTRIBUTING.md, copyright Apache 2.0 nos .js | ⚠️ PARCIAL | .env.example ✅, NOTICE ✅, CONTRIBUTING.md ✅, LICENSE ✅. MAS o cabeçalho "Copyright 2026 codingsh / Apache License 2.0" aparece apenas nos 4 fontes principais (app.js, server.js, calculadora.js, src/app.js). **landing/assets/script.js e os 4 arquivos teste/app.test.js NÃO têm o cabeçalho.** A afirmação "nos .js" (todos) não se confirma. |
| 10 | Guia central de npm install no start-here | ✅ VERDADEIRO | 00-start-here/01-como-usar-este-repo.md linhas 46-58: `cd ...`, `npm install`, `npm test`, `npm start`. Entregue. |

**Resumo das 10:** 6 verdadeiras completas (4, 5, 7, 8, 10 + parte da 2), 2 parciais/máscara (3 e 9), 2 falhas (1 e 6). Duas das dez afirmações do usuário são exageradas ou falsas (MOBI "todos os lugares" e copyright "nos .js").

---

## Confirmação funcional dos testes (execução real)

Rodado localmente com `npm install --no-audit --no-fund` + `npm test` em cada projeto:

| Projeto | Testes | Resultado | Exit Code |
|---------|--------|-----------|-----------|
| 01-todo-app-com-revisao | 8 | ✅ Todos passam | 0 |
| 02-api-com-agente | 10 | ✅ Todos passam | 0 |
| 03-sistema-com-verificacao-automatica | 12 | ✅ Todos passam | 0 |
| 04-projeto-final | 2 | ✅ Todos passam | 0 |
| **Total** | **32** | **32/32 passam** | |

Obs.: o projeto 3 usa `jest ^25.1.0` (versão obsoleta) e emite `DeprecationWarning: fs.F_OK is deprecated`, mas os testes passam.

---

## Sobre o CI (correção do relatório anterior)

Existe `.github/workflows/deploy.yml`, mas ele **só faz deploy da landing no GitHub Pages**. Não roda testes, não roda lint, não roda `npm audit`. Não é um pipeline de qualidade; é um pipeline de publicação. A ausência de CI de qualidade permanece.

---

## Problemas que PERMANECEM (lista dura)

### 1. QA_STUDENT.md ainda cita MOBI (correção 1/6 não entregue)
Linha 56: "- Download MOBI disponível? Não — apenas EPUB." Um documento que deve ser modelo limpo para o próximo aluno não deve referenciar um formato inexistente. Não está limpo.

### 2. npm audit não corrige nada — apenas mascara (CRÍTICO)
O projeto 3 reporta **32 vulnerabilidades, incluindo 2 críticas**. `npm audit --audit-level=critical` não remove vulnerabilidades; apenas ajusta o nível de severidade para não quebrar o comando. As vulnerabilidades críticas continuam lá. O próprio npm avisa "fix available via `npm audit fix`", que nunca foi executado. Projetos 1, 2 e 4 nem script de audit têm.

### 3. Dependências antigas/vulneráveis no projeto 3
`jest ^25.1.0` é obsoleto e arrasta pacotes vulneráveis (`request`, `tough-cookie`, `uuid`, `qs`, `node-notifier`, etc.). Gera DeprecationWarning e é um risco de segurança ativo.

### 4. Nenhum projeto tem lint (foi removido, não substituído)
A remoção do ESLint conta como entregue (o usuário pediu), mas do ponto de vista de qualidade o repositório ficou sem qualquer mecanismo de análise estática. Não há lint, não há consistência de estilo, não há gate de qualidade de código.

### 5. Não há CI de qualidade
O único workflow (`.github/workflows/deploy.yml`) só publica a landing. Não roda testes, nem audit, nem lint em nenhum dos 4 projetos. Uma regressão pode entrar silenciosamente.

### 6. Apenas 1 de 4 projetos tem script de audit
Projetos 1, 2 e 4 não têm `npm audit`. Não há cobertura de segurança uniforme.

### 7. Copyright Apache 2.0 incompleto nos .js
Apenas 4 dos 9 arquivos .js têm o cabeçalho de copyright/licença. Faltam: `landing/assets/script.js` e os 4 `teste/app.test.js`.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 20% | 9,0 | Todos passam, isolamento da API funcionando. Único ponto forte real. |
| Correções reportadas realmente aplicadas e funcionais | 20% | 5,0 | 6 verdadeiras completas, 2 parciais (audit máscara, copyright incompleto), 2 falhas (MOBI ainda em QA_STUDENT). Duas afirmações do usuário são exageradas/falsas. |
| Segurança (npm audit) | 15% | 2,0 | 32 vulnerabilidades (2 críticas) presentes, não corrigidas. --audit-level=critical apenas mascara. |
| Qualidade do código (lint, análise estática) | 15% | 2,0 | ESLint removido de todos os projetos (sem substituto). Sem gate de qualidade. |
| Documentação consistente (README, QA, landing) | 15% | 4,0 | MOBI removido da landing e downloads ✅, mas QA_STUDENT.md ainda cita MOBI; READMEs de projetos ainda referenciam ESLint; copyright ausente em 5 .js. |
| Boas práticas (CI, consistência entre projetos, dependências) | 10% | 2,0 | Sem CI de qualidade (só deploy), sem lint, projeto 3 com jest ^25.1.0 obsoleto, audit só no projeto 3. |
| **PONDERADA FINAL** | **100%** | **4,5** | |

**Nota geral: 4,5 / 10**

A nota **não sobe** em relação à avaliação anterior (4,5). Embora as correções de superfície estejam agora realmente aplicadas e verificadas (MOBI fora da landing/downloads, aria-live, TypeScript removido, 32 testes confirmados, app.listen protegido, ESLint realmente removido dos package.json, guia npm install no start-here), a base técnica continua fraca: vulnerabilidades críticas não corrigidas (apenas mascaradas), QA_STUDENT.md ainda cita MOBI, ausência completa de lint e de CI de qualidade, dependências obsoletas, e copyright ausente em parte dos .js. O repositório está "arrumado na superfície" mas não é tecnicamente sólido. Além disso, duas das dez alegações do usuário se mostraram exageradas ou falsas ao confronto direto com os arquivos.

---

## O que exatamente faltaria para chegar a 10/10 (realista)

1. **Remover TODA referência ao MOBI do QA_STUDENT.md** (linha 56), deixando o documento completamente limpo como modelo para o próximo aluno.
2. **Corrigir as vulnerabilidades de segurança:** executar `npm audit fix` (e `--force` quando necessário) até que `npm audit --audit-level=moderate` saia com código 0 em todos os projetos. Não basta mascarar com `--audit-level=critical`.
3. **Adicionar scripts de audit aos 4 projetos** para consistência de segurança.
4. **Atualizar dependências obsoletas**, especialmente `jest ^25.1.0` no projeto 3 (arrasta pacotes vulneráveis e gera deprecation warnings).
5. **Adicionar scripts de lint e uma configuração de análise estática a todos os 4 projetos** (ou outro gate de qualidade funcional).
6. **Adicionar CI (GitHub Actions) de qualidade** que rode testes, lint e audit em todos os 4 projetos a cada push/PR (o deploy.yml existente não conta).
7. **Completar o cabeçalho Apache 2.0/Copyright em todos os .js** (incluindo landing/assets/script.js e os 4 teste/app.test.js).
8. **Atualizar os READMEs dos projetos 03 e 04** para não referenciar mais .eslintrc.json, script lint nem dependência eslint (eles já foram removidos).
9. **Manter os 32 testes passando** — garantir que futuras mudanças não quebrem a suíte.
10. **Adicionar documentação de contribuindo com gates de qualidade** (pré-requisito para PR: testes verdes, audit limpo).

---

## Conclusão

O repositório está em **4,5 / 10**. As correções cosméticas/de superfície (MOBI removido da landing e downloads, aria-live adicionado, TypeScript removido dos pré-requisitos, app.listen protegido, 32 testes realmente passando, ESLint removido dos package.json, guia npm install no start-here) estão corretas e confirmadas. Mas a base técnica continua quebrada ou ausente: vulnerabilidades críticas presentes e não corrigidas (apenas mascaradas pelo --audit-level=critical), QA_STUDENT.md ainda cita MOBI, nenhum projeto tem lint, não há CI de qualidade, o projeto 3 usa dependências obsoletas, e o copyright Apache 2.0 não está em todos os .js.

**O repositório NÃO está pronto para publicação pública.** Publicar com vulnerabilidades críticas não corrigidas, documentação de QA que referencia formato inexistente, cabeçalho de licença incompleto nos arquivos .js e ausência total de gates de qualidade (lint/CI de qualidade) é irresponsável. Pelo menos os itens 1, 2 e 6 da lista acima precisam ser resolvidos antes de qualquer lançamento público.

---

Caminho do relatório: /Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md  
Nota geral: 4,5 / 10  
Pronto para publicação pública: NÃO
