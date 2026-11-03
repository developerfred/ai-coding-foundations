# RELATÓRIO DO REVISOR PESSIMISTA — AI Coding Foundations (Reavaliação)

**Repositório analisado:** /Volumes/MASS/ai-code-foundation/
**Revisor:** Pessimista (revisão crítica, cética e exigente)
**Data:** 03/11/2026
**Status:** Pré-publicação
**Nota anterior:** 3,5 / 10

---

## RESUMO EXECUTIVO

**Nota geral atualizada: 4,5 / 10**

O repositório AI Coding Foundations avançou em pontos concretos e mensuráveis, mas continua longe de estar pronto para uso público. Das oito correções críticas reportadas, **todas oito foram aplicadas corretamente**. O problema é que essas correções atacam sintomas de configuração, não os defeitos de produto mais graves.

O que mudou de verdade: os binários (EPUB/MOBI) passaram a ser versionados no Git, o GitHub Pages agora inclui a pasta `downloads/` no artefato, o `package.json` do projeto 3 deixou de mascarar falhas com `|| true`, o ESLint está configurado, o Jest passou a ser usado de fato no projeto 3 com testes reais, a chave de tradução morta `hero.download` foi removida e as mensagens de erro foram acentuadas corretamente.

O que continua quebrado: o **MOBI continua sendo um stub inutilizável** (mesmo arquivo de 1975 bytes, sem conteúdo do livro), apenas **1 de 4 projetos tem testes reais**, o Todo App continua sem validação de entrada nem acessibilidade, a documentação está duplicada (README.md == prompt.md), não há `.env.example` apesar do módulo de segurança exigir variáveis de ambiente, e não há TypeScript apesar de ser mencionado nos pré-requisitos.

A nota subiu de 3,5 para 4,5 porque o pipeline de entrega agora funciona (EPUB versionado + Pages serve downloads), mas a entrega principal ainda está pela metade (MOBI não abre) e a qualidade de código/testes continua fraca.

---

## VERIFICAÇÃO DAS 8 CORREÇÕES REPORTADAS

Todas as oito correções foram conferidas arquivo por arquivo. Resultado: **8/8 aplicadas corretamente.**

| # | Correção reportada | Status | Evidência |
|---|--------------------|--------|-----------|
| 1 | `.gitignore` com exceção `!downloads/book.epub` e `!downloads/book.mobi` | ✅ Corrigido | `.gitignore` linhas 14-16; `git check-ignore` retorna vazio (não ignorados); `git ls-files downloads/` lista ambos |
| 2 | `deploy.yml` inclui `downloads/` no artefato do GitHub Pages | ✅ Corrigido | Linhas 30-34: `cp -r downloads/* _artifact/downloads/` antes do `upload-pages-artifact` |
| 3 | `package.json` do projeto 3 removeu `|| true` de lint e audit | ✅ Corrigido | `"lint": "eslint calculadora.js teste/app.test.js"`, `"audit": "npm audit --audit-level=moderate"`, `"verificar": "npm run lint && npm test && npm run audit"` |
| 4 | `landing/index.html` removeu chave morta `hero.download`, adicionou `hero.downloadEpub`/`hero.downloadMobi` | ✅ Corrigido | Nenhuma chave `hero.download` nas traduções; `hero.downloadEpub` e `hero.downloadMobi` presentes e usadas nos botões |
| 5 | `book.epub` e `book.mobi` versionados no Git | ✅ Corrigido | `git ls-files downloads/` mostra ambos rastreados; `downloads/book.mobi` não está no `.gitignore` |
| 6 | Mensagens de erro acentuadas corretamente | ✅ Corrigido | `calculadora.js`: `'Valor deve ser um número finito.'`, `'Divisão por zero não é permitida.'`; Todo App: `'Tarefa não pode estar vazia.'`; API: `'ID inválido.'`. Nenhuma mensagem sem acento encontrada. |
| 7 | `.eslintrc.json` existe no projeto 3 | ✅ Corrigido | Arquivo presente em `05-projects/03-sistema-com-verificacao-automatica/.eslintrc.json` com `eslint:recommended` |
| 8 | Jest adicionado ao projeto 3 com `teste/app.test.js` | ✅ Corrigido | `jest` nas `devDependencies`, `"test": "jest"`, e `teste/app.test.js` com 11 testes Jest reais (soma, subtração, multiplicação, divisão, strings, NaN, divisão por zero) |

---

## PROBLEMAS CRÍTICOS RESOLVIDOS

Esses problemas do relatório anterior (3,5/10) deixam de ser críticos após esta reavaliação:

### C-2: Binários não versionados — RESOLVIDO
`book.epub` e `book.mobi` agora estão rastreados pelo Git. Quem clonar o repositório terá os arquivos. O GitHub Pages poderá serví-los.

### C-3: GitHub Pages não fazia upload dos binários — RESOLVIDO
O workflow agora copia `downloads/` para `_artifact/downloads/` antes de publicar. Os links relativos `downloads/book.epub` e `downloads/book.mobi` da landing page funcionarão no site publicado.

### C-4 (parte): Inconsistência `package.json` — PARCIALMENTE RESOLVIDO
O `package.json` real do projeto 3 já não usa `|| true`, não referencia caminhos inexistentes no lint, e o Jest está instalado e configurado. Ainda resta alinhar o README com o `package.json` real (veja problemas que permanecem).

### G-7 / G-8: `|| true` mascarando lint e audit — RESOLVIDO
Ambos os scripts foram limpos. O `verificar` agora para na primeira falha (`&&`), não mascara erros.

### G-1: Chave de tradução morta `hero.download` — RESOLVIDO
Chave removida das traduções; apenas `hero.downloadEpub` e `hero.downloadMobi` permanecem, ambas usadas.

### M-1: Acentuação em mensagens de erro — RESOLVIDO
Mensagens agora usam acento correto em PT-BR (`não`, `não é`, `inválido`, `número`).

---

## PROBLEMAS CRÍTICOS QUE AINDA PERMANECEM

Esses pontos do relatório anterior **não foram tocados** e continuam impedindo o uso público:

### C-1: book.mobi continua sendo um stub inutilizável (NÃO CORRIGIDO)

**Descrição:** O arquivo `downloads/book.mobi` tem 1975 bytes (mesmo tamanho do relatório anterior). O cabeçalho começa com `AI Coding Foundations` seguido de zeros, contém a string `TEXTMOBI` mas não há registros de texto, não há índice navegável, não há metadados reais de um MOBI válido. Um Kindle não conseguirá ler isso como livro.

**Por que é crítico:** A landing page promete "Baixar MOBI (Kindle)". Um usuário que baixar terá um arquivo que não abre como livro. Isso quebra a entrega principal do produto — metade do valor prometido não existe.

**Evidência:** `xxd downloads/book.mobi` mostra `4149 2043 ... AI Coding Foundations` seguido de zeros, com `TEXTMOBI` mas nenhum corpo de texto. Tamanho: 1975 bytes.

**Sugestão:** Gerar um MOBI real a partir do EPUB com Calibre (`ebook-convert book.epub book.mobi`) ou Kindle Previewer, substituir o stub, e atualizar `downloads/README.md`. Se não for possível antes da publicação, remover o link de MOBI da landing page e avisar que apenas o EPUB está disponível.

---

### C-5: Testes continuam majoritariamente "está rodando", sem casos de borda (NÃO CORRIGIDO)

**Descrição:** Apenas o projeto 3 (`03-sistema-com-verificacao-automatica`) usa Jest com testes reais. Os outros três projetos continuam com `assert` caseiro sem framework:
- `01-todo-app-com-revisao/teste.js`: testa apenas caminho feliz e lista vazia. Não testa localStorage, renderização, índice negativo, tarefa duplicada, limite de tamanho.
- `02-api-com-agente/teste.js`: testa apenas `typeof app === 'function'` e validação de string. Não faz requisições HTTP reais, não testa POST/DELETE, não testa códigos de status.
- `04-projeto-final/teste/app.test.js`: continua sendo um placeholder que só faz `assert(true, ...)`.

**Por que é crítico:** O repositório prega "testes são obrigatórios com IA" mas os próprios projetos não cumprem. Um estudante copiará esse padrão fraco.

---

### C-6: Não há validação de entrada robusta nem acessibilidade no Todo App (NÃO CORRIGIDO)

**Descrição:** O `app.js` do Todo App não tem `maxlength` no input, não limita o tamanho da tarefa, não tem `aria-label` nos botões, não tem `aria-live` na div de mensagem, não tem link "skip to content". O `localStorage` armazena dados sem aviso de segurança.

**Por que é crítico:** É um exemplo de "código revisado por humano" que deveria ser um modelo de boas práticas, mas tem lacunas óbvias.

---

## PROBLEMAS GRAVES QUE AINDA PERMANECEM

### G-2: Acessibilidade ausente na landing page e nos projetos (NÃO CORRIGIDO)
- Botões de download sem `aria-label` descritivo.
- Nenhum link "skip to content".
- Elementos trocados dinamicamente não herdam `lang` individualmente.
- Conteúdo educacional só existe em PT-BR; não há versão EN dos módulos.

### G-4: README.md e prompt.md são idênticos (duplicação) (NÃO CORRIGIDO)
Ambos têm exatamente as mesmas 184 linhas. Causa confusão de manutenção (qual atualizar?).

### G-5: Não há exemplo prático de variáveis de ambiente (.env) (NÃO CORRIGIDO)
O módulo de segurança diz "Nunca coloque segredos no código. Use .env" mas nenhum projeto mostra como. Não há `.env.example`, não há `dotenv`, não há uso de `process.env` além de `PORTA`.

### G-6: Não há TypeScript apesar de mencionar nos pré-requisitos (NÃO CORRIGIDO)
O `02-pre-requisitos.md` menciona TypeScript como opcional, mas todo o código é JavaScript puro.

### G-3 (ajustado): package-lock.json versionado sem diretriz no .gitignore
O `.gitignore` ignora `npm-debug.log` mas não menciona `package-lock.json`. Para reprodutibilidade educacional é aceitável manter os lockfiles, mas deveria estar explícito.

---

## NOVOS PROBLEMAS ENCONTRADOS

Nenhum problema novo foi introduzido pelas oito correções — elas foram aplicadas limpas, sem regressões. O que aparece agora é mais visível porque o pipeline de entrega finalmente funciona, expondo melhor o conteúdo vazio por trás:

- **O EPUB agora é servido pelo GitHub Pages, mas o MOBI continua sendo um stub.** A diferença é mais gritante: um formato baixa um livro de verdade, o outro baixa um arquivo de 1975 bytes inutilizável. Isso cria uma experiência inconsistente para o usuário.
- **O projeto 3 agora tem testes Jest reais, o que evidencia ainda mais a pobreza dos testes nos outros três projetos.** O contraste chama atenção para o padrão fraco que permanece.

---

## NOTA GERAL ATUALIZADA

**Nota geral: 4,5 / 10** (era 3,5 / 10)

A subida de 1,0 ponto reflete exclusivamente as oito correções de configuração/entrega, que foram bem executadas. O núcleo do produto (MOBI funcional, testes de qualidade, acessibilidade, documentação coerente) continua intocado.

| Categoria | Nota anterior | Nota atual | Comentário |
|-----------|--------------|------------|------------|
| Segurança | 4,0 | 4,5 | `|| true` removido do audit; ainda falta `.env` prático e validação de input |
| Qualidade de código | 3,5 | 4,0 | `.eslintrc.json` configurado; sem `|| true`; ainda inconsistências README/package.json |
| Testes | 2,5 | 3,5 | Projeto 3 agora tem Jest real; outros 3 projetos continuam com `assert` caseiro/placeholder |
| Landing page | 5,0 | 5,5 | Chave morta removida; i18n funcional; acessibilidade ainda ausente |
| EPUB | 8,0 | 8,0 | Estrutura válida, mantido |
| MOBI | 1,0 | 1,0 | **Continua sendo um stub inutilizável** |
| Documentação | 3,5 | 3,5 | README/prompt duplicados, sem alterações |
| Créditos | 9,0 | 9,0 | Presentes em todos os lugares necessários |
| GitHub Pages | 3,0 | 5,0 | Agora inclui `downloads/` no artefato |

---

## SUGESTÕES CONCRETAS DE CORREÇÃO (plano de ação, em ordem de prioridade)

1. **Gerar MOBI real** a partir do EPUB com Calibre e substituir o stub (crítico).
2. **Substituir testes caseiros por Jest** em todos os projetos; adicionar casos de borda (array vazio, null, índice negativo, requisições HTTP com supertest).
3. **Adicionar validação de tamanho e acessibilidade** ao Todo App (`maxlength`, `aria-label`, `aria-live`, skip link).
4. **Gerar um MOBI válido ou remover o link de MOBI** da landing page se não for possível antes da publicação.
5. **Remover `prompt.md`** ou diferenciá-lo do README (acabar com duplicação).
6. **Adicionar `.env.example`** com exemplo prático de variáveis de ambiente.
7. **Adicionar TypeScript** ou remover a menção aos pré-requisitos.
8. **Adicionar `aria-label`/`aria-live`/skip link** na landing page.
9. **Corrigir meta cover do EPUB** (remover ou adicionar imagem de capa ao manifest).
10. **Expandir CONTRIBUTING.md** com ambiente, testes, padrão de commits, código de conduta.
11. **Preencher status do README** de acordo com o estado real (não marcar tudo como "Concluído").
12. **Adicionar cabeçalho de copyright Apache 2.0** preenchido nos arquivos-fonte.

---

**Caminho do relatório:** `/Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md`

**Nota geral: 4,5 / 10**
