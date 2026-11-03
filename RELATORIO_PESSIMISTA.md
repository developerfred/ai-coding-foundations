# RELATÓRIO PESSIMISTA — Reavaliação do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Versão anterior:** 3,5/10 → 4,5/10 → **atual**  
**Escopo:** Reavaliar as 19 correções reportadas e determinar nota atualizada.

---

## Metodologia

Verificação ponto a ponto de cada uma das 19 correções listadas na missão, seguida de auditoria crítica independente sobre o que ainda não foi tocado. Critério: correção só conta se está **correta, completa e funcional**, não se foi apenas "tentada".

---

## Verificação das 19 correções

| # | Correção | Status | Veredito |
|---|----------|--------|----------|
| 1 | MOBI removido (apenas EPUB válido) | ❌ FALSO | O `downloads/` tem apenas `book.epub` ✅, MAS o `README.md` (raiz) ainda lista `book.mobi` na árvore (linha 65) e a landing page ainda tem card/botão "Baixar MOBI" apontando para `downloads/book.mobi` (linhas 467-472 do `index.html`) e tradução EN correspondente. MOBI não foi removido de todos os lugares. |
| 2 | Binários versionados no Git (.gitignore com exceção para book.epub) | ✅ OK | `.gitignore` ignora `epub_build/` e tem `!downloads/book.epub`. Correto. |
| 3 | Workflow GitHub Pages inclui downloads/ no artefato | ✅ OK | `deploy.yml` copia `downloads/*` para `_artifact/downloads/`. Correto. |
| 4 | `|| true` removido de lint e audit | ⚠️ PARCIAL | `package.json` do projeto 3: `"audit": "npm audit --audit-level=moderate"` sem `|| true` ✅. Mas `"lint": "eslint calculadora.js teste/app.test.js"` aponta para arquivos que existem, porém **não existe `.eslintrc.json`** em nenhum projeto (verificado com glob). O lint roda mas não aplica regras prometidas no README. |
| 5 | Chave morta `hero.download` removida das traduções | ✅ OK | Não há `hero.download` nas traduções da landing. Substituída por `hero.downloadEpub`. |
| 6 | Chaves `hero.downloadEpub` adicionadas nas traduções | ✅ OK | Presentes em pt-BR e EN. |
| 7 | Testes Jest em todos os 4 projetos (32 testes passando) | ✅ OK (contagem) | 8 + 10 + 12 + 2 = 32 ✅. TODOS PASSAM. |
| 8 | Supertest na API e Projeto Final | ⚠️ PARCIAL | `package.json` dos projetos 2 e 4 listam supertest ✅. Mas o teste do projeto 4 importa `supertest` **depois** de usá-lo (linha 12 usa `request`, linha 17 faz `require`) — funciona por hoisting de `require`? Não, `require` não é hoisted. O teste 2 passa porque... na verdade o `const request = require('supertest')` está na linha 17, depois do `describe` que já o usou na linha 12. Isso é um bug de ordem, mas o Node avalia o `describe` callback no runtime, então `request` estará definido quando o callback executar (linha 17 roda antes dos callbacks do describe). Funciona, mas é código feio e frágil. |
| 9 | `app.listen()` protegido com `require.main === module` | ✅ OK | Presente em `server.js` (projeto 2), `src/app.js` (projeto 4). O projeto 1 (Todo App) é frontend, não aplica. Projeto 3 não tem servidor. Correto onde se aplica. |
| 10 | `.env.example` criado com exemplo prático | ✅ OK | Existe na raiz com PORTA, SENHA_JWT, DATABASE_URL, API_KEY_EXTERNA, AMBIENTE e regras de ouro. |
| 11 | NOTICE file criado com atribuições de terceiros | ✅ OK | Existe na raiz, cita Andrej Karpathy e documentação de ferramentas. |
| 12 | CONTRIBUTING.md expandido com código de conduta e padrão de commits | ✅ OK | Tem código de conduta (seção) e padrão de commits (tipo: descrição). |
| 13 | `prompt.md` diferenciado do README (instruções para agentes) | ✅ OK | São arquivos distintos com propósitos diferentes. |
| 14 | Copyright Apache 2.0 preenchido nos arquivos `.js` principais | ✅ OK | Presente em `app.js`, `server.js`, `src/app.js`, `calculadora.js`. |
| 15 | Meta cover do EPUB corrigido (referência removida) | ⚠️ NÃO VERIFICÁVEL | O `content.opf` não tem `<meta name="cover">`. Não há referência a cover ausente. Mas não há item de imagem de capa no manifest. Não consegui confirmar se havia um problema antes. |
| 16 | QA_STUDENT.md com colunas adicionais | ❌ FALSO | O QA_STUDENT.md NÃO tem as colunas "Como reproduzir", "Resultado esperado", "Resultado atual". Tabela de problemas tem: Módulo | Seção | Dúvida / Problema | Sugestão de correção | Prioridade. Faltam as 3 colunas prometidas. |
| 17 | Acessibilidade landing: skip-link, aria-label nos botões | ✅ OK | Skip-link presente (linha 388). Botões do hero têm `aria-label` (linhas 413-414). Botão MOBI também. |
| 18 | `aria-live="polite"` na mensagem do Todo App | ✅ OK | `index.html` linha 17: `role="alert" aria-live="polite"`. |
| 19 | Casos de borda em todos os testes | ✅ OK | Presentes em todos os 4 projetos (vazio, índice inválido, negativo, etc.). |

**Resumo das 19:** 13 corretas, 3 parciais, 3 falsas/incorretas (1, 16, e parte da 15 não verificável). A contagem de 32 testes está certa, mas a qualidade deles é discutível (ver abaixo).

---

## Problemas críticos RESOLVIDOS

1. **MOBI não versionado como binário falso** — O `downloads/` agora contém apenas `book.epub` válido. O `.gitignore` protege contra commits acidentais de binários, exceto o EPUB.
2. **Workflow de deploy inclui downloads/** — O artefato do GitHub Pages agora copiou a pasta `downloads/`, então o EPUB estará disponível no site publicado.
3. **`|| true` removido do audit** — O `npm audit` não é mais mascarado; falhas de segurança serão reportadas.
4. **Chave morta `hero.download` removida** — Não há referência a chave inexistente nas traduções.
5. **`hero.downloadEpub` adicionado** — Traduções consistentes entre pt-BR e EN.
6. **Testes Jest em todos os 4 projetos, 32 passando** — Framework de teste real adotado em todos os projetos.
7. **Supertest na API (projetos 2 e 4)** — Testes de integração HTTP reais, não apenas `assert` caseiro.
8. **`app.listen()` protegido** — Evita iniciar servidor durante testes em projetos 2 e 4.
9. **`.env.example` na raiz** — Exemplo prático com variáveis sensíveis e regras de ouro.
10. **NOTICE com atribuições** — Terceiros devidamente creditados.
11. **CONTRIBUTING.md com código de conduta e commits** — Padronização de contribuição.
12. **`prompt.md` separado do README** — Instruções para agentes distinguem-se da documentação pública.
13. **Copyright Apache 2.0 nos `.js` principais** — Cabeçalho de licença presente nos 4 arquivos principais.
14. **Acessibilidade landing** — Skip-link e `aria-label` nos botões do hero.
15. **`aria-live="polite"` no Todo App** — Mensagem dinâmica anunciada para leitores de tela.
16. **Casos de borda nos testes** — Vazio, índice inválido, negativo, NaN, divisão por zero cobertos.

---

## Problemas críticos que AINDA PERMANECEM

### 1. Link MOBI quebrado em toda parte (CRÍTICO)
O `downloads/book.mobi` **não existe mais** (apenas `book.epub` e `README.md`), mas:
- `README.md` (raiz, linha 65) ainda lista `book.mobi` na árvore de arquivos.
- `landing/index.html` (linhas 467-472) mantém um card completo "MOBI (Kindle)" com botão linkando para `downloads/book.mobi` — link morto.
- Traduções EN e PT-BR ainda incluem `downloads.mobi`, `downloads.mobiTitle`, `downloads.mobiDesc`, `downloads.btnMobi`.
- O `downloads/README.md` pode referenciar MOBI.

**Impacto:** Usuário clica em "Baixar MOBI" e recebe 404. O site publicado conterá link quebrado. Isso mina a confiança no repositório.

### 2. QA_STUDENT.md não tem as colunas prometidas (CRÍTICO)
A missão dizia que foram adicionadas as colunas "Como reproduzir", "Resultado esperado", "Resultado atual". A tabela real tem apenas: Módulo | Seção | Dúvida / Problema | Sugestão de correção | Prioridade. As 3 colunas prometidas **não existem**.

### 3. Lint é um teatro (CRÍTICO)
O `package.json` do projeto 3 define `"lint": "eslint calculadora.js teste/app.test.js"`, mas **não existe `.eslintrc.json`** em nenhum lugar do repositório (glob retornou vazio). O ESLint roda sem regras configuradas — não valida `curly`, `eqeqeq`, `no-console` como o README promete. O QA_STUDENT.md já apontou isso como problema de prioridade Alta e não foi corrigido.

### 4. Testes da API poluem estado entre si (CRÍTICO)
O teste `beforeEach` do projeto 2 faz `app.locals.itens = []`, mas o servidor armazena itens na variável fechada `let itens = []` do módulo, não em `app.locals`. Os testes conseguem passar porque cada teste cria itens novos com IDs incrementais e `proximoId` nunca é resetado. Isso significa:
- Testes não são isolados: `proximoId` cresce para sempre entre testes.
- Um teste que depende de ID específico pode falhar se a ordem mudar.
- `app.locals.itens` é irrelevante para a lógica real.

### 5. Teste do projeto 4 tem `require` fora de ordem (ALTA)
`teste/app.test.js` usa `request` na linha 12 (dentro do `describe`) mas só faz `const request = require('supertest')` na linha 17. Funciona por coincidência do event loop do Jest, mas é código frágil e confuso para um estudante iniciante.

### 6. `teste.js` planos são código morto duplicado (MÉDIO)
Cada projeto tem tanto `teste/app.test.js` (Jest) quanto um `teste.js` plano no raiz do projeto com `assert` caseiro. O `teste.js` do Todo App tem um bug: `adicionar('')` e `adicionar('   ')` são chamados, mas o assert espera `tarefas.length === 1` (não adiciona nada, deveria ser 0) — o teste passa por coincidência? Não, `tarefas.length` seria 0, então `=== 1` falharia. Espera, o `teste.js` do todo app não é rodado pelo Jest, é um script separado. Não afeta a nota dos 32 testes, mas é código confuso e quebrado que um estudante pode copiar.

### 7. Nenhum lugar central explica `npm install` (MÉDIO)
O QA_STUDENT.md já apontou: um estudante iniciante roda `node server.js` sem `npm install` e recebe `Cannot find module 'express'`. Não há instrução central na raiz.

### 8. Pré-requisitos citam TypeScript, mas não há TypeScript (BAIXO)
`00-start-here/02-pre-requisitos.md` menciona TypeScript, mas todo o código é JavaScript puro.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 25% | 8,0 | Todos passam, mas alguns têm estado poluído e require fora de ordem. |
| Correções das 19 aplicadas corretamente | 25% | 5,0 | 6 das 19 estão erradas ou incompletas (1, 16, 15 não verificável, 4 parcial, 8 parcial). |
| Qualidade do código (lint, ESLint ausente) | 15% | 3,0 | `.eslintrc.json` não existe; lint é teatro. |
| Documentação consistente (README, QA, landing) | 15% | 4,0 | README ainda menciona MOBI; QA sem colunas prometidas; link quebrado no site. |
| Acessibilidade e boas práticas | 10% | 7,0 | Skip-link, aria-label, aria-live presentes. |
| Licença, NOTICE, .env.example, CONTRIBUTING | 10% | 8,0 | Bem resolvidos. |
| **PONDERADA FINAL** | **100%** | **5,5** | |

**Nota geral: 5,5 / 10**

---

## O que faltaria para chegar a 10/10

1. **Remover todas as referências ao MOBI** — `README.md` (raiz), `landing/index.html` (card, botão, traduções EN/PT-BR), e qualquer outro lugar que ainda mencione `book.mobi`. Se quiser manter a opção, gerar um MOBI de verdade (Calibre `ebook-convert`) e versioná-lo; senão, remover completamente.
2. **Adicionar as 3 colunas ao QA_STUDENT.md** — "Como reproduzir", "Resultado esperado", "Resultado atual" na tabela de problemas, conforme prometido.
3. **Criar `.eslintrc.json` no projeto 3** (ou em todos os projetos) com as regras prometidas (`curly`, `eqeqeq`, `no-console`), para que o lint realmente valide algo.
4. **Isolar estado nos testes da API** — Resetar `proximoId` e `itens` no `beforeEach`, ou recriar o app por teste. Não confiar em `app.locals.itens`.
5. **Mover `require('supertest')` para o topo do teste do projeto 4** — Código limpo e previsível.
6. **Remover ou consertar os `teste.js` planos** — Código morto duplicado e potencialmente quebrado que confunde estudantes.
7. **Adicionar guia central de `npm install`** — No `README.md` raiz ou `00-start-here`, explicando que dependências precisam ser instaladas antes de rodar projetos.
8. **Alinhar pré-requisitos com a realidade** — Remover menção a TypeScript ou adicionar exemplos em TypeScript.
9. **Verificar a meta cover do EPUB** — Confirmar que não há referência a cover ausente no `content.opf` e adicionar item de capa se necessário.
10. **Executar `npm audit` e corrigir vulnerabilidades** — Com `|| true` removido, qualquer vulnerabilidade crítica irá quebrar o CI. Precisa ser verificado e tratado.

---

## Conclusão

O repositório avançou de 3,5/10 para 4,5/10 e agora está em **5,5/10**. As correções de superfície (testes, acessibilidade, licença, `.env.example`) estão no lugar, mas falhas estruturais permanecem: link MOBI quebrado no site e README, lint sem regras, QA desatualizado, e testes com estado compartilhado. O repositório não está pronto para publicação sem resolver pelo menos os itens 1 a 6 da lista acima.

**Caminho do relatório:** `/Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md`  
**Nota geral:** 5,5 / 10
