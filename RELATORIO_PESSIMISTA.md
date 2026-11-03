# RELATÓRIO DO REVISOR PESSIMISTA — AI Coding Foundations

**Repositório analisado:** /Volumes/MASS/ai-code-foundation/
**Revisor:** Pessimista (revisão crítica, cética e exigente)
**Data:** 03/11/2026
**Status:** Pré-publicação

---

## RESUMO EXECUTIVO

**Nota geral: 3,5 / 10**

O repositório AI Coding Foundations tem boas intenções e conteúdo educacional razoável em texto, mas está longe de estar pronto para uso público. Há problemas críticos que impedem a publicação: o MOBI é um stub inutilizável, os binários (EPUB/MOBI) não estão versionados no Git, o fluxo de GitHub Pages aponta para pastas que não existem como artefato, o Jest não é realmente usado na maioria dos projetos (apenas `assert` caseiro), há inconsistências graves entre documentação e código (ex: `package.json` do projeto 3 aponta para `jest` e `teste/app.test.js`, mas o arquivo real é `teste.js` usando `assert` caseiro), e o EPUB não está versionado (está no `.gitignore`, então não será servido pelo GitHub Pages).

O código dos projetos é didático, simples demais para se chamar "produção-ready", e os testes são maioritariamente testes de "está rodando" que não cobrem casos de borda significativos. A landing page funciona visualmente, mas tem bugs de JS (chave `hero.download` inexistente nas traduções), faltam atributos de acessibilidade (`aria-label`, `alt`), e os links diretos para `book.epub`/`book.mobi` apontam para arquivos que não estão versionados no repositório.

Abaixo, lista detalhada de problemas críticos, graves e menores, com sugestões concretas de correção.

---

## PROBLEMAS CRÍTICOS (impedem uso público)

### C-1: book.mobi é um stub inutilizável (não é um MOBI de verdade)

**Descrição:** O arquivo `downloads/book.mobi` tem 1975 bytes (o QA relatou 485 bytes, mas o atual é ainda maior, contudo continua sendo um stub). O cabeçalho começa com `AI Coding Foundations` seguido de zeros e contém a string `TEXTMOBI` mas não há conteúdo do livro — não há registros de texto, não há índice navegável, não há metadados reais de um MOBI válido. Um Kindle não conseguirá ler isso como livro.

**Por que é crítico:** A landing page promete "Baixar MOBI (Kindle)". Um usuário que baixar terá um arquivo que não abre como livro. Isso quebra a entrega principal do produto.

**Evidência:** `xxd downloads/book.mobi` mostra `4149 2043 ... AI Coding Foundations` seguido de zeros, com `TEXTMOBI` mas nenhum corpo de texto do livro.

**Sugestão de correção:**
- Gerar um MOBI real a partir do EPUB usando Calibre (`ebook-convert book.epub book.mobi`) ou o Kindle Previewer.
- Substituir o stub pelo MOBI gerado.
- Atualizar o `downloads/README.md` para informar o tamanho real e a data de geração.
- Se não for possível gerar um MOBI válido antes da publicação, remover o link de download do MOBI da landing page e avisar claramente que apenas o EPUB está disponível.

---

### C-2: Binários (book.epub e book.mobi) não estão versionados no Git

**Descrição:** O `.gitignore` ignora `downloads/*.epub` e `downloads/*.mobi`. Como resultado, os 53 arquivos versionados do repositório NÃO incluem os binários. Quem clonar o repositório não terá o EPUB nem o MOBI. O GitHub Pages não conseguirá servi-los porque não existem no histórico do Git.

**Por que é crítico:** A proposta de valor do repositório inclui "download EPUB e MOBI". Sem os binários versionados, o download não funciona para ninguém que não seja o autor local.

**Evidência:** `git ls-files` não lista nenhum arquivo dentro de `downloads/` exceto `downloads/README.md`.

**Sugestão de correção:**
- Remover as linhas `downloads/*.epub` e `downloads/*.mobi` do `.gitignore` (ou adicionar uma exceção com `!downloads/book.epub` e `!downloads/book.mobi`).
- Fazer `git add downloads/book.epub downloads/book.mobi` e commitar.
- Verificar se o workflow de GitHub Pages faz upload da pasta `downloads/` (atualmente faz upload apenas de `landing/`).

---

### C-3: Workflow de GitHub Pages não faz upload dos binários nem da landing completa

**Descrição:** O arquivo `.github/workflows/deploy.yml` faz upload apenas do caminho `landing/` como artefato de páginas. Isso significa que:
1. Os arquivos binários em `downloads/` não serão publicados.
2. A landing page referencia `downloads/book.epub` e `downloads/book.mobi` com caminhos relativos, mas esses arquivos não estarão no site publicado.
3. O workflow não define `basePath` nem configura o `github-pages` build corretamente para um site de projeto (vs. site de organização/usuário).

**Por que é crítico:** Mesmo que os binários sejam versionados, eles não serão servidos pelo GitHub Pages com o workflow atual.

**Evidência:** `deploy.yml` linha 33: `path: 'landing/'` — apenas a pasta landing é enviada.

**Sugestão de correção:**
- Alterar o `path` do upload-pages-artifact para incluir tanto `landing/` quanto `downloads/`, ou mudar para `path: '.'` com filtro adequado.
- Se o repositório for um site de projeto (`username.github.io/repo/`), adicionar `basePath: /ai-code-foundation` no `configure-pages` ou garantir que os links relativos funcionem.
- Adicionar um passo que copie `downloads/` para o diretório de artefato antes do upload.

---

### C-4: Inconsistência grave entre package.json e arquivos reais (Projeto 3)

**Descrição:** O `package.json` do projeto `03-sistema-com-verificacao-automatica` declara:
- `"test": "jest"` — mas não há arquivo `jest.config.js` e o teste real usa `assert` caseiro (`teste.js`), não Jest.
- `"lint": "eslint calculadora.js teste/app.test.js"` — referencia `teste/app.test.js` que não existe no package.json do README (o arquivo real é `teste.js` na raiz e há um `teste/app.test.js` separado).
- `"devDependencies": { "jest": "^29.0.0" }` — Jest está instalado no `node_modules` local, mas não é usado por nenhum teste do projeto.

O README do projeto 3 menciona `.eslintrc.json` (que existe) mas o `package.json` do README (linhas 36-40) difere do `package.json` real (linhas 7-15): no README o lint é `eslint calculadora.js teste.js`, no real é `eslint calculadora.js teste/app.test.js || true`.

**Por que é crítico:** Um estudante que seguir o README vai rodar `npm test` e o Jest não encontrará testes (ou falhará), e `npm run lint` vai referenciar um arquivo inexistente. Isso ensina práticas erradas e quebra a confiança.

**Evidência:** `package.json` real linha 7: `"test": "jest"`, linha 8: `"lint": "eslint calculadora.js teste/app.test.js || true"`. Arquivo real de teste é `teste.js` (raiz) usando `assert`, não Jest.

**Sugestão de correção:**
- Unificar `package.json` real e o do README.
- Ou (a) remover Jest das devDependencies e usar `node teste.js` como script de teste, ou (b) converter `teste.js` para usar Jest de fato e colocar na pasta `teste/`.
- Corrigir o caminho do lint para apontar ao arquivo que realmente existe.
- Remover o `|| true` que mascara falhas de lint (anula o propósito da verificação).

---

### C-5: Testes são maioritariamente "está rodando", não cobrem casos de borda

**Descrição:** Exceto pelo projeto 3 (que tem Jest e testes razoáveis da calculadora), todos os outros testes usam `assert` caseiro sem framework:
- `01-todo-app-com-revisao/teste.js`: testa apenas caminho feliz e vazia. Não testa localStorage, não testa renderização, não testa índice negativo, não testa tarefa duplicada.
- `02-api-com-agente/teste.js`: testa apenas `typeof app === 'function'` e validação de string. Não faz requisições HTTP reais, não testa POST/DELETE, não testa códigos de status.
- `04-projeto-final/teste/app.test.js`: é um placeholder que só faz `assert(true, ...)`.

**Por que é crítico:** O repositório prega "testes são obrigatórios com IA" mas os próprios projetos não cumprem. Um estudante copiará esse padrão fraco.

**Sugestão de correção:**
- Substituir `assert` caseiro por Jest em todos os projetos (ou pelo menos adicionar Jest como padrão).
- Adicionar testes de caso de borda: array vazio, null, undefined, valores negativos, índice fora do range, requisições HTTP com supertest, erros de rede, autenticação.
- Para o projeto 4, substituir o placeholder por testes reais da API.

---

### C-6: Não há validação de entrada robusta nem proteção contra XSS no Todo App

**Descrição:** O `app.js` do Todo App insere `tarefa.texto` diretamente no DOM via `span.textContent` (isso é seguro contra XSS porque `textContent` não executa HTML). No entanto:
- Não há limite de tamanho da tarefa (um usuário poderia inserir milhares de caracteres e quebrar o layout/localStorage).
- Não há sanitização de entradas além do trim.
- `localStorage` armazena dados sem criptografia (aceitável para um exemplo educacional, mas deveria ser avisado).
- O `index.html` não tem `autocomplete="off"` nem `maxlength` no input.

**Por que é crítico:** É um exemplo de "código revisado por humano" que deveria ser um modelo de boas práticas, mas tem lacunas óbvias.

**Sugestão de correção:**
- Adicionar `maxlength` no input e validação de tamanho máximo no JS.
- Adicionar aviso no README sobre localStorage não ser seguro para dados sensíveis.
- Adicionar `aria-label` nos botões e `aria-live` na div de mensagem para acessibilidade.

---

## PROBLEMAS GRAVES (precisam ser corrigidos antes de publicar)

### G-1: Landing page tem chave de tradução inexistente (`hero.download`)

**Descrição:** No objeto `translations`, a chave `hero.download` existe em pt-BR ('Baixar livro →') e en ('Download book →'), mas NENHUM elemento no HTML usa `data-i18n="hero.download"`. Os botões usam `hero.downloadEpub` e `hero.downloadMobi`. Isso é código morto e confuso.

**Por que é grave:** Indica falta de revisão do i18n. Se alguém tentar usar `hero.download`, terá `undefined`.

**Sugestão:** Remover a chave `hero.download` das traduções ou usá-la em um elemento relevante.

---

### G-2: Acessibilidade ausente na landing page e nos projetos

**Descrição:**
- Nenhuma imagem tem `alt` (não há imagens, mas os ícones/emojis são texto sem marcação).
- Os botões de download não têm `aria-label` descritivo.
- A div `#mensagem` no Todo App tem `role="alert"` mas não tem `aria-live="polite"`.
- Não há `skip to content` link.
- O idioma da página é `pt-BR` mas ao trocar para EN o `lang` muda (bom), porém o conteúdo dos módulos (markdown) só existe em PT-BR — não há versão EN dos conteúdos educacionais.

**Sugestão:** Adicionar `aria-label`, `aria-live`, `skip link`, e considerar versões EN dos módulos ou avisar que o conteúdo é apenas PT-BR.

---

### G-3: .gitignore ignora package-lock.json? Não — mas node_modules está versionado em dois projetos

**Descrição:** O `.gitignore` ignora `node_modules/` corretamente. No entanto, `git ls-files` mostra que `02-api-com-agente/node_modules/` e `03-sistema-com-verificacao-automatica/node_modules/` NÃO estão versionados (não aparecem na lista). Isso está correto.

Porém, `package-lock.json` de `02-api-com-agente` e `03-sistema-com-verificacao-automatica` ESTÃO versionados (aparecem no `git ls-files`). O `.gitignore` NÃO ignora `package-lock.json`. Isso é um ponto debatível: para um repositório educacional, versionar lockfiles pode ser útil, mas o `.gitignore` não tem menção a `package-lock.json`. Não é um erro, mas vale notar a inconsistência: o gitignore ignora `npm-debug.log` mas não `package-lock.json`.

**Sugestão:** Decidir se `package-lock.json` deve ser versionado ou ignorado, e deixar explícito no `.gitignore`. Para reprodutibilidade educacional, recomendo manter os lockfiles versionados.

---

### G-4: README.md e prompt.md são idênticos (duplicação de conteúdo)

**Descrição:** `README.md` e `prompt.md` têm exatamente as mesmas 184 linhas. Isso é duplicação desnecessária que vai causar confusão de manutenção (qual deles atualizar?).

**Sugestão:** Remover `prompt.md` ou torná-lo um arquivo de instruções para agentes com conteúdo distinto do README.

---

### G-5: Não há exemplo prático de variáveis de ambiente (.env) apesar da segurança exigir

**Descrição:** O módulo de segurança (04-agentic-workflows/04-seguranca-e-qualidade) diz "Nunca coloque segredos no código. Use variáveis de ambiente (.env)" mas nenhum projeto mostra como usar `.env` na prática. Não há arquivo `.env.example`, não há uso de `dotenv`, não há exemplo de `process.env` além de `PORTA`.

**Sugestão:** Adicionar um `.env.example` e um projeto que use `dotenv` para ler uma chave de API, demonstrando a prática.

---

### G-6: Não há TypeScript apesar de mencionar nos pré-requisitos

**Descrição:** O `02-pre-requisitos.md` menciona TypeScript como opcional, mas todo o código é JavaScript puro. Não há exemplo de TypeScript em nenhum lugar.

**Sugestão:** Remover a menção a TypeScript ou adicionar um exemplo em TypeScript para coerência.

---

### G-7: ESLint tem `|| true` que mascara falhas (Projeto 3)

**Descrição:** O script `"lint": "eslint calculadora.js teste/app.test.js || true"` faz com que o lint nunca falhe (o `|| true` retorna sucesso mesmo se o ESLint encontrar erros). Isso anula completamente o propósito da verificação automática.

**Sugestão:** Remover o `|| true` para que o lint falhe e impeça o `npm run verificar` de prosseguir com código com problemas.

---

### G-8: scripts de "audit" também mascarados com `|| true`

**Descrição:** `"audit": "npm audit --audit-level=moderate || true"` — mesmo com vulnerabilidades, o comando retorna sucesso. Anula a verificação de segurança.

**Sugestão:** Remover `|| true` ou tratar a saída do `npm audit` adequadamente.

---

## PROBLEMAS MENORES (polimento)

### M-1: Inconsistência de acentuação em mensagens de erro

**Descrição:** Alguns exemplos usam mensagens sem acento (`ID invalido`, `percentual invalido lancado erro`, `preco nao pode ser negativo`) enquanto o Todo App usa acento correto (`não pode estar vazia`).

**Sugestão:** Padronizar para acento correto em PT-BR.

---

### M-2: O exemplo de SQL injection usa `$1` (PostgreSQL) sem avisar que varia por banco

**Descrição:** Já apontado pelo QA. O exemplo usa placeholders `$1, $2` do PostgreSQL, mas não explica que MySQL usa `?`, SQLite usa `?`, etc.

**Sugestão:** Adicionar nota sobre placeholders variarem por banco de dados.

---

### M-3: Não há lugar central explicando `npm install` antes de rodar projetos

**Descrição:** Já apontado pelo QA. Um estudante iniciante que tente `node server.js` no projeto 2 sem `npm install` terá `Cannot find module 'express'`.

**Sugestão:** Adicionar uma seção no `00-start-here/01-como-usar-este-repo.md` explicando que cada projeto com `package.json` requer `npm install` primeiro.

---

### M-4: Checklist de revisão humana é um template vazio (checkboxes não preenchidos)

**Descrição:** Os checklists nos READMEs dos projetos têm `[ ]` não marcados. Eles são exemplos, não evidências de revisão real.

**Sugestão:** Substituir por um checklist preenchido como exemplo, ou esclarecer que é um template para o aluno preencher.

---

### M-5: Não há NOTICE file (exigido pela Apache 2.0 se houver notificações)

**Descrição:** A Apache 2.0 seção 4(d) exige um NOTICE file se a obra incluir um. O repositório não tem um. Não é estritamente obrigatório se não houver notificações de terceiros, mas é boa prática para um repositório educacional.

**Sugestão:** Adicionar um `NOTICE` com agradecimentos/atribuições (Karpathy, etc.) se aplicável.

---

### M-6: O EPUB não lista o autor completo com email no dc:creator

**Descrição:** O `content.opf` tem `<dc:creator>codingsh</dc:creator>` mas o email não aparece. O `<dc:contributor>` tem o email. É uma inconsistência menor.

**Sugestão:** Colocar o nome completo e email no `dc:creator` ou manter consistência.

---

### M-7: EPUB tem meta cover referenciando `cover-image` que não existe no manifest

**Descrição:** O `content.opf` tem `<meta name="cover" content="cover-image"/>` mas não há item `cover-image` no `<manifest>`. Isso pode causar problemas em alguns leitores de EPUB.

**Sugestão:** Remover a linha do meta cover ou adicionar uma imagem de capa ao manifest.

---

### M-8: Não há arquivo de esquema/validação do EPUB (não há `META-INF/compression/` ou similar)

Não é obrigatório, mas o EPUB 2.0 está bem formado. O `mimetype` está primeiro e não comprimido (correto). O `toc.ncx` é válido. Todos os 9 capítulos estão listados tanto no opf quanto no ncx.

**Avaliação do EPUB:** A estrutura do EPUB está correta e válida (`unzip -t` passou). Não há erro grave aqui.

---

### M-9: A pasta `epub_build/` existe localmente mas não está no Git (está no .gitignore)

**Descrição:** Existe uma pasta `epub_build/` localmente (listada no `read` da raiz) que está ignorada pelo `.gitignore`. Não é um problema se for apenas build local, mas vale notar.

---

### M-10: A acessibilidade da landing page falta `lang` nos elementos trocados dinamicamente

**Descrição:** Ao trocar de idioma via JS, apenas `document.documentElement.lang` é alterado. Elementos individuais não têm `lang` sobrescrito. Leitores de tela podem não detectar a mudança corretamente.

**Sugestão:** Considerar adicionar `lang` nos elementos com `data-i18n` ou confiar no `lang` do `html`.

---

## CREDIBILIDADE — CRÉDITOS codingsh <codingsh@pm.me>

Os créditos estão presentes em praticamente todos os arquivos (32 matches encontrados via grep). Estão no README, prompt.md, CONTRIBUTING.md, landing page, rodapé de todos os módulos, downloads/README.md, e no EPUB (`dc:contributor`). Isso está adequado.

**Observação:** O `LICENSE` não menciona o autor explicitamente (é o texto padrão da Apache 2.0 sem o boilerplate de copyright preenchido). Isso é aceitável mas não ideal — o booleano "Copyright [yyyy] [name of copyright owner>" não foi preenchido nos arquivos-fonte.

**Sugestão:** Adicionar o cabeçalho de copyright Apache 2.0 preenchido (`Copyright 2026 codingsh <codingsh@pm.me>`) no topo de todos os arquivos de código-fonte (.js, .html, .css) e nos markdowns principais.

---

## DOCUMENTAÇÃO — CONTRADIÇÕES

1. **README.md == prompt.md** (184 linhas idênticas) — duplicação.
2. **Projeto 3 package.json (README vs real):** diferem nos scripts `test` e `lint`.
3. **Projeto 3 lint aponta para `teste/app.test.js`** mas o teste principal é `teste.js` (raiz). Há ambos os arquivos (`teste.js` raiz e `teste/app.test.js` Jest) — confusão.
4. **README status diz "Concluído" para todos os módulos**, mas o QA encontrou itens ainda para corrigir.
5. **Pré-requisitos mencionam TypeScript**, mas não há TypeScript no repositório.

---

## QA_STUDENT.md — AVALIAÇÃO

O documento é útil como template, mas tem poucas filas preenchidas (apenas o exemplo e a tabela de leitura em andamento). A seção "Dúvidas e problemas encontrados" tem boas entradas (9 linhas) mas poderia ter mais campos (ex: "Como reproduzir", "Resultado esperado", "Resultado atual"). A seção "Código que não roda" tem 3 entradas. No geral, é funcional mas enxuto.

**Sugestão:** Adicionar colunas "Como reproduzir" e "Resultado esperado/atual", e incentivar preenchimento de mais itens.

---

## .gitignore — AVALIAÇÃO

Ignora corretamente: `node_modules/`, `epub_build/`, logs, IDE, OS. Não ignora `package-lock.json` (debateável). **PROBLEMA CRÍTICO:** ignora `downloads/*.epub` e `downloads/*.mobi`, impedindo versionamento dos binários.

**Sugestão:** Adicionar exceções `!downloads/book.epub` e `!downloads/book.mobi`.

---

## CONTRIBUTING.md — AVALIAÇÃO

É útil mas superficial. Não explica:
- Como configurar o ambiente de desenvolvimento.
- Como rodar os testes antes de enviar um PR.
- Padrão de commits (mensagens descritivas são mencionadas no checklist do projeto 4 mas não no CONTRIBUTING).
- Código de conduta.
- Como revisar um PR.

**Sugestão:** Expandir com seções de "Configuração do ambiente", "Como testar suas mudanças", "Padrão de commits", "Código de conduta".

---

## GITHUB PAGES — AVALIAÇÃO

O workflow está configurado para deploy na branch `main` com `actions/deploy-pages@v4`, mas só faz upload de `landing/`. Não inclui `downloads/`. Não configura `basePath` para site de projeto.

**Sugestão:** Corrigir o `path` do upload e adicionar `basePath` se necessário. Verificar se o repositório tem GitHub Pages habilitado nas configurações (Source: GitHub Actions).

---

## NOTA FINAL POR CATEGORIA

| Categoria | Nota | Comentário |
|-----------|------|------------|
| Segurança | 4,0 | Código didático sem vulns graves, mas falta .env prático, XSS/limite de input, e audit mascarado |
| Qualidade de código | 3,5 | Simples demais, `|| true` mascara erros, inconsistências package.json |
| Testes | 2,5 | Maioria é `assert` caseiro, Jest não usado de fato, placeholder no projeto 4 |
| Landing page | 5,0 | Visual bom, i18n funcional, mas chave morta, acessibilidade ausente, links de binário quebrados |
| EPUB | 8,0 | Estrutura válida, mimetype primeiro, opf/ncx corretos |
| MOBI | 1,0 | Stub inutilizável |
| Documentação | 3,5 | README/prompt duplicados, contradições, CONTRIBUTING raso |
| Créditos | 9,0 | Presentes em todos os lugares necessários |
| QA_STUDENT.md | 6,0 | Útil mas enxuto |
| .gitignore | 4,0 | Ignora binários críticos (EPUB/MOBI) |
| CONTRIBUTING.md | 4,0 | Útil mas superficial |
| GitHub Pages | 3,0 | Não faz upload dos downloads, caminho limitado |

**NOTA GERAL: 3,5 / 10**

---

## SUGESTÕES CONCRETAS DE CORREÇÃO (plano de ação)

1. **Gerar MOBI real** a partir do EPUB com Calibre e substituir o stub.
2. **Versionar os binários:** remover `downloads/*.epub` e `downloads/*.mobi` do `.gitignore` (ou adicionar `!` exceções), fazer `git add` e commitar.
3. **Corrigir workflow do GitHub Pages:** incluir `downloads/` no `path` do upload-pages-artifact; adicionar `basePath` se for site de projeto.
4. **Unificar package.json do projeto 3:** decidir se usa Jest ou `assert` caseiro; corrigir caminhos de lint; remover `|| true` de lint e audit.
5. **Substituir testes caseiros por Jest** em todos os projetos; adicionar casos de borda.
6. **Adicionar validação de tamanho e acessibilidade** ao Todo App.
7. **Remover chave morta `hero.download`** das traduções da landing page.
8. **Adicionar `aria-label`/`aria-live`/`skip link`** para acessibilidade.
9. **Adicionar `.env.example`** com exemplo prático de variáveis de ambiente.
10. **Remover `prompt.md`** ou diferenciar do README.
11. **Adicionar cabeçalho de copyright Apache 2.0** preenchido nos arquivos-fonte.
12. **Corrigir meta cover do EPUB** (remover ou adicionar imagem de capa).
13. **Expandir CONTRIBUTING.md** com ambiente, testes, padrão de commits, código de conduta.
14. **Preencher status do README** de acordo com o real estado (não marcar tudo como "Concluído" se há itens pendentes).
15. **QA_STUDENT.md:** adicionar colunas "Como reproduzir" e "Resultado esperado/atual".

---

**Caminho do relatório:** `/Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md`

**Nota geral: 3,5 / 10**
