# QA do Aluno — Leitura Crítica do Livro

Este documento é preenchido por um estudante que lê todo o repositório do começo ao fim.  
O objetivo é apontar **dúvidas, partes confusas, erros de código, conceitos faltantes e sugestões de correção**, para que voltemos e consertemos antes de publicar.

> Como usar: leia cada módulo na ordem. Sempre que algo não ficar claro, anote abaixo com:  
> **Módulo | Seção | Dúvida / Problema | Sugestão de correção | Prioridade (Alta/Média/Baixa)**

---

## Exemplo preenchido (para você ver como preencher)

| Módulo | Seção | Dúvida / Problema | Sugestão de correção | Prioridade |
|--------|-------|-------------------|----------------------|------------|
| 03-ai-assisted-coding | Leitura de Código Gerado | O exemplo de SQL injection usa `$1` (PostgreSQL), mas não explica que outros bancos usam `?` ou `:id`. | Adicionar uma nota dizendo que o placeholder varia conforme o banco de dados. | Média |
| 01-fundamentals | Estruturas de Dados | O exemplo de pilha usa JavaScript, mas o aluno que estuda Python pode ficar perdido. | Adicionar um pequeno exemplo em Python ao lado. | Baixa |
| landing/index.html | Hero | O botão "Baixar livro" aponta para `#downloads`, mas não está claro que são dois arquivos separados. | Adicionar subtítulos nos botões: "Baixar EPUB" e "Baixar MOBI". | Alta |

---

## Leitura em andamento

| # | Módulo | Status | Notas do aluno |
|---|--------|--------|----------------|
| 1 | 00-start-here | ✅ Lido | 01-como-usar-este-repo.md e 02-pre-requisitos.md lidos. Tudo claro. |
| 2 | 01-fundamentals | ✅ Lido | 4 sub-módulos lidos (algoritmos, estruturas de dados, sistemas e redes, engenharia de software). |
| 3 | 02-software-2.0 | ✅ Lido | 3 arquivos lidos (o que é S2.0, gradient descent, RNNs a LLMs). |
| 4 | 03-ai-assisted-coding | ✅ Lido | 4 sub-módulos lidos (leitura de código, prompting, debug, testes). |
| 5 | 04-agentic-workflows | ✅ Lido | 4 sub-módulos lidos (agentes vs autocomplete, fluxo, revisão humana, segurança). |
| 6 | 05-projects | ✅ Lido | 4 projetos lidos e todos os testes executados. |
| 7 | examples / before-after e bom-vs-ruim | ✅ Lido | Ambos lidos. |
| 8 | Landing page (pt-BR / EN) | ✅ Lido | landing/index.html lido (versão PT-BR default + tradução EN via data-i18n). |
| 9 | EPUB / MOBI | ✅ Lido | Verificados em downloads/. |

---

## Dúvidas e problemas encontrados

| Módulo | Seção | Dúvida / Problema | Sugestão de correção | Prioridade |
|--------|-------|-------------------|----------------------|------------|
| 03-ai-assisted-coding | 04-testes-e-verificacao | O exemplo de código `function aplicarDesconto` está quebrado no meio da palavra (`aplicarDesco` quebra linha e continua `nto`), o que gera erro de sintaxe se o aluno copiar e colar. | Ajustar a formatação do código para que `aplicarDesconto` fique em uma linha só. | Alta |
| 05-projects | 03-sistema-com-verificacao-automatica | O README menciona o arquivo `.eslintrc.json`, mas esse arquivo não existe na pasta do projeto. O `npm run lint` não efetivamente valida nada sem ele. | Adicionar o `.eslintrc.json` ao projeto (ou ajustar o README para não prometer um arquivo que não existe). | Alta |
| downloads | book.mobi | O arquivo `book.mobi` tem apenas 485 bytes: é um stub (cabeçalho "AI Coding Foundations" + zeros), não um MOBI com o conteúdo do livro. Quem baixar não conseguirá ler o livro no Kindle. | Gerar um MOBI de verdade a partir do EPUB (ex.: Calibre) ou substituir por um aviso claro de que o MOBI ainda não está disponível. | Alta |
| landing/index.html | Hero | O botão "Baixar livro →" aponta para `#downloads` e não deixa claro que existem dois arquivos separados (EPUB e MOBI). | Separar os botões no hero: "Baixar EPUB" e "Baixar MOBI", ou adicionar uma nota abaixo do botão. | Média |
| 03-ai-assisted-coding | 03-debug-e-correcao-de-codigo-ia | O teste se chama "calcularMedia retorna NaN para array vazio", mas o corpo espera `toThrow` (lança erro), não NaN. Nome enganoso para um iniciante. | Renomear para "calcularMedia lança erro para array vazio" ou ajustar o teste para realmente retornar NaN. | Média |
| 02-api-com-agente | teste.js | Há um objeto mock `resVazio` confuso, incompleto e não executado (código morto com comentário "simplificado — em produção use supertest"). Um estudante pode tentar copiá-lo e não funcionar. | Remover o mock incompleto ou substituir por um exemplo funcional com supertest instalado como devDependency. | Média |
| examples / 03-ai-assisted-coding | Vários | Mensagens de erro em português sem acento (`ID invalido`, `percentual invalido lancado erro`, `preco nao pode ser negativo`) enquanto o app.js do todo app usa acento corretamente (`não pode estar vazia`). Inconsistência de PT-BR no mesmo repositório. | Padronizar: ou tudo com acento correto ou tudo sem. Recomendo manter acento correto em mensagens voltadas ao usuário. | Baixa |
| 01-fundamentals | 03-sistemas-e-redes | O exercício usa `fetch`, que só existe nativamente no Node.js a partir da v18. O pré-requisito pede Node v18+, mas um aluno com Node mais antigo terá erro sem entender por quê. | Adicionar nota: "requer Node.js v18+ para `fetch` nativo; em versões anteriores use uma biblioteca como `node-fetch`". | Baixa |

---

## Código que não roda / erros encontrados

| Módulo | Arquivo | Erro | Correção proposta |
|--------|---------|------|-------------------|
| 03-ai-assisted-coding | 04-testes-e-verificacao/README.md | `function aplicarDesco\nnto(preco, percentual)` — quebra de linha dentro do nome da função causa erro de sintaxe (`SyntaxError`) se copiado para um arquivo. | Corrigir para `function aplicarDesconto(preco, percentual)` em uma linha. |
| 05-projects | 03-sistema-com-verificacao-automatica/README.md | O script `npm run lint` chama `eslint calculadora.js teste.js`, mas `.eslintrc.json` não existe na pasta; o ESLint não aplica as regras prometidas (curly, eqeqeq, no-console). | Criar `.eslintrc.json` com as regras listadas no README. |
| downloads | book.mobi | Não é um MOBI legível (485 bytes, stub). Não contém texto do livro. | Regenerar o MOBI a partir do EPUB válido (ex.: Calibre ou `ebook-convert`). |

---

## Conceitos que faltam ou estão confusos

| Módulo | Conceito ausente / confuso | Por que é importante |
|--------|---------------------------|----------------------|
| 05-projects (geral) | Não há um lugar central explicando como instalar dependências antes de rodar os projetos (`npm install` é necessário para `express` e `eslint`, mas só aparece nos READMEs individuais). | Um estudante iniciante que tente `node server.js` no projeto 2 sem `npm install` terá erro `Cannot find module 'express'` e não saberá o que fazer. |
| 04-agentic-workflows / 03-ai-assisted-coding | Não há exemplo prático de uso de variáveis de ambiente (`.env`) para segredos, embora a seção de segurança diga "Nunca coloque segredos no código". | O aluno lê a regra, mas não vê como aplicá-la na prática. |
| 03-ai-assisted-coding | Todos os testes são scripts caseiros com `assert`; não há um framework de testes de verdade (Jest, Vitest) instalado em nenhum projeto. | O aluno pode achar que esse é o padrão da indústria e não aprender a usar ferramentas reais de teste. |
| 01-fundamentals / 00-start-here | Os pré-requisitos citam TypeScript, mas todo o código do repositório é JavaScript puro. Não fica claro onde ou se TypeScript é usado. | Um iniciante pode esperar exemplos em TypeScript e não encontrar nenhum. |

---

## Observações gerais (landing page, downloads, licença, créditos)

- Licença Apache 2.0 presente? ✅ Sim — arquivo `LICENSE` na raiz, texto completo da Apache License 2.0.
- Créditos codingsh <codingsh@pm.me> presentes? ✅ Sim — aparecem no README, prompt.md, LICENSE (via CONTRIBUTING), landing page e rodapé de todos os módulos.
- Download EPUB funciona? ✅ Sim — `book.epub` (12 KB) é um ZIP/EPUB válido (`unzip -t` passou).
- Download MOBI funciona? ❌ Não como livro — `book.mobi` tem 485 bytes e é apenas um cabeçalho/stub sem conteúdo. Não abre como livro de verdade no Kindle.
- Idioma EN / PT-BR completo? Parcial — a landing page tem tradução EN completa via `data-i18n` no `index.html`; todos os módulos (markdown) estão apenas em PT-BR. Não há versão EN dos conteúdos dos módulos.
- `README.md` e `prompt.md` são idênticos (duplicação de conteúdo). Sugestão: manter apenas um ou deixar claro o propósito de cada um.
- O status no README marca todos os módulos como "Concluído" — condiz com o conteúdo existente, mas o QA apontou itens ainda para corrigir antes de publicar.

---

**Responsável QA**: aluno-piloto  
**Data**: 03/11/2026
