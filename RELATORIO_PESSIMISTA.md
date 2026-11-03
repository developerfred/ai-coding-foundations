# RELATÓRIO PESSIMISTA — Reavaliação do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Versão anterior:** 3,5 → 4,5 → 5,5 → 5,5 → 6,0/10  
**Escopo:** Verificar ponto a ponto se as 7 correções reportadas realmente estão no repositório, se funcionam, e determinar a nota atualizada. Critério: correção só conta se está correta, completa e funcional, não se foi apenas prometida ou tentada.

---

## Verificação das 7 correções reportadas

| # | Correção reportada | Status | Veredito |
|---|-------------------|--------|----------|
| 1 | Landing HTML: subtítulo pt-BR diz apenas "EPUB", não "EPUB e MOBI" | ✅ VERDADEIRO | Linha 458 de landing/index.html: "O livro está disponível em EPUB, totalmente gratuito...". Linha 547 (EN): "The book is available in EPUB...". Nenhuma menção a MOBI na landing. Entregue. |
| 2 | downloads/README.md não cita MOBI como formato disponível | ✅ VERDADEIRO | Linha 7: apenas EPUB na tabela. Linha 13: "Atualmente apenas o EPUB está disponível para download." Sem MOBI. Entregue. |
| 3 | QA_STUDENT.md reescrito como modelo limpo (sem referências antigas ao MOBI) | ⚠️ PARCIAL | O documento foi reescrito como modelo/template limpo ✅. MAS ainda menciona MOBI factualmente: linha 23 ("MOBI removido") e linha 56 ("Download MOBI disponível? ❌ Não — apenas EPUB. Para MOBI, converter o EPUB com Calibre."). Não é uma referência a formato disponível, mas ainda cita MOBI. |
| 4 | .eslintrc.json com env: jest em TODOS os 4 projetos | ⚠️ PARCIAL / QUEBRADO | Todos os 4 projetos têm .eslintrc.json com `"jest": true` no env ✅. MAS: (a) apenas o projeto 3 tem eslint instalado como devDependency (projetos 1, 2, 4 não têm eslint nem script de lint); (b) o eslint do projeto 3 é a versão ^4.0.0 (deprecated, sem suporte); (c) `npm run lint` falha no projeto 3 com erro "Environment key 'es2022' is unknown" — o lint não roda, sai com código 1. O lint é inoperante. |
| 5 | npm audit com --audit-level=critical (não quebra CI) | ❌ FALSO | Apenas o projeto 3 tem o script de audit (projetos 1, 2, 4 não têm). No projeto 3, `npm run audit` sai com **código 1**: foram encontradas **39 vulnerabilidades** (4 low, 28 moderate, 5 high, **2 critical** — form-data). O --audit-level=critical NÃO mascara as críticas: as 2 vulnerabilidades críticas de form-data aparecem e quebram a execução. CI quebra. |
| 6 | aria-live="polite" na seção de downloads da landing | ✅ VERDADEIRO | Linha 453 de landing/index.html: `<section id="downloads" aria-live="polite">`. Entregue e funcional. |
| 7 | TypeScript removido dos pré-requisitos | ✅ VERDADEIRO | Linha 7 de 00-start-here/02-pre-requisitos.md diz apenas "JavaScript". Linha 17: "Todo o código do repositório está em JavaScript puro. Nenhuma dependência de TypeScript." Entregue. |

**Resumo das 7:** 4 verdadeiras (1, 2, 6, 7), 1 parcial (3), 2 quebradas/falsas (4 e 5). Duas das sete correções reportadas não funcionam na prática.

---

## Testes automatizados — verificação real

Execução local efetiva:

| Projeto | Testes | Resultado | Exit Code |
|---------|--------|-----------|-----------|
| 01-todo-app-com-revisao | 8 | ✅ Todos passam | 0 |
| 02-api-com-agente | 10 | ✅ Todos passam | 0 |
| 03-sistema-com-verificacao-automatica | 12 | ✅ Todos passam (reportado anteriormente) | 0 |
| 04-projeto-final | 2 | ✅ Todos passam | 0 |
| **Total** | **32** | **32/32 passam** | |

Os testes funcionam. Este é o único ponto forte do repositório.

---

## Problemas críticos que PERMANECEM (lista dura)

### 1. Lint inoperante em todos os projetos (CRÍTICO)
O projeto 3 tem `npm run lint` mas falha com "Environment key 'es2022' is unknown" porque o eslint instalado é a versão ^4.0.0, que não reconhece esse env key. Projetos 1, 2 e 4 não têm eslint instalado nem script de lint. Um estudante que tente validar código com lint encontra erro de ambiente, não de código. O .eslintrc.json existe em todos os 4, mas é decoração sem função.

### 2. npm audit falha — 39 vulnerabilidades, 2 críticas (CRÍTICO)
No projeto 3, `npm audit --audit-level=critical` sai com código 1. Há vulnerabilidades críticas (form-data: unsafe random function e CRLF injection) que não são mascaradas pelo --audit-level=critical. Projetos 1, 2, 4 nem script de audit têm. Não houve npm audit fix, nem pinagem, nem avaliação de risco. Qualquer CI que rode `npm audit` quebra.

### 3. ESLint v4.0.0 deprecated e inseguro (CRÍTICO)
O projeto 3 declara `"eslint": "^4.0.0"` como devDependency. Esta versão é obsoleta ("This version is no longer supported" no npm), tem vulnerabilidades conhecidas e não suporta configurações modernas (como o env "es2022"). É um risco de segurança ativo.

### 4. QA_STUDENT.md ainda cita MOBI (MÉDIO)
Linhas 23 e 56 ainda mencionam MOBI, mesmo que como "removido" ou "não disponível". Um aluno lendo o modelo encontra referência a um formato que não existe, o que gera confusão desnecessária em um documento que deveria ser um modelo limpo.

### 5. Correções de segurança e lint não se estendem a todos os 4 projetos (MÉDIO)
Apenas o projeto 3 tem scripts de lint e audit, e apenas ele tem eslint instalado. Projetos 1, 2 e 4 estão sem nenhuma configuração de lint ou audit. Não há consistência entre os projetos.

### 6. npm audit não tratado, apenas mascarado (ALTA)
As vulnerabilidades existem e não foram corrigidas. `npm audit fix` ou `npm audit fix --force` nunca foi executado. O --audit-level=critical não remove vulnerabilidades; apenas tenta ocultar parte delas — e falha mesmo assim por causa das 2 críticas.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 20% | 9,0 | Todos passam, isolamento da API funcionando. |
| Correções reportadas realmente implementadas e funcionais | 20% | 4,0 | 4 de 7 verdadeiras, 1 parcial, 2 quebradas (lint não roda, audit falha). |
| Qualidade do código (lint, ESLint) | 15% | 1,0 | ESLint v4.0.0 deprecated, lint falha com erro de env, 3 projetos sem eslint. |
| Documentação consistente (README, QA, landing) | 15% | 5,0 | MOBI removido da landing e downloads/README ✅, mas QA_STUDENT.md ainda cita MOBI. |
| Segurança (npm audit) | 15% | 1,0 | 39 vulnerabilidades (2 críticas), npm audit falha com código 1, nada foi corrigido. |
| Boas práticas (sem código morto, consistência entre projetos) | 10% | 3,0 | Testes OK, mas lint/audit só no projeto 3, ESLint quebrado. |
| **PONDERADA FINAL** | **100%** | **4,5** | |

**Nota geral: 4,5 / 10**

Houve PIORA em relação à avaliação anterior (6,0/10). A queda ocorre porque, ao inspecionar profundamente, descobri que o lint não roda (ESLint v4.0.0 incompatível com o próprio .eslintrc.json), o npm audit não apenas não foi corrigido como FALHA com código 1 mesmo com --audit-level=critical (vulnerabilidades críticas presentes), e apenas 1 de 4 projetos tem qualquer configuração de lint/audit. As correções de superfície (MOBI removido, aria-live, TypeScript removido) estão corretas, mas a base técnica está quebrada.

---

## O que exatamente faltaria para chegar a 10/10 (realista)

1. **Corrigir o ESLint:** atualizar eslint para versão suportada (^8.x ou ^9.x), remover o env inválido "es2022" (substituir por "es2021" ou similar suportado), instalar eslint como devDependency em TODOS os 4 projetos, adicionar scripts de lint em todos, e garantir que `npm run lint` saia com código 0.
2. **Corrigir o npm audit:** executar `npm audit fix` e avaliar as que exigem `--force`. Garantir que `npm audit --audit-level=moderate` saia com código 0 em todos os projetos. Não basta mascarar.
3. **Remover TODA referência ao MOBI do QA_STUDENT.md** (linhas 23 e 56), deixando o documento completamente limpo como modelo para o próximo aluno.
4. **Adicionar scripts de lint e audit aos projetos 1, 2 e 4** para consistência com o projeto 3.
5. **Atualizar dependências vulneráveis** (form-data, minimatch, tmp, etc.) que geram as 2 críticas e 5 altas.
6. **Manter os 32 testes passando** — garantir que futuras mudanças não quebrem a suíte.
7. **Adicionar CI (GitHub Actions)** que rode lint, testes e audit em todos os 4 projetos, para impedir que regressões entrem no repositório.

---

## Conclusão

O repositório caiu para **4,5 / 10**. As correções cosméticas (MOBI removido da landing e downloads, aria-live adicionado, TypeScript removido dos pré-requisitos) estão corretas. Mas as correções de infraestrutura de qualidade estão quebradas: o ESLint é v4.0.0 (deprecated) e não roda devido ao env "es2022" inválido, o npm audit encontra 39 vulnerabilidades incluindo 2 críticas e sai com código 1 mesmo com --audit-level=critical, e apenas 1 de 4 projetos tem qualquer configuração de lint/audit.

**O repositório NÃO está pronto para publicação pública.** Publicar com lint quebrado, ESLint vulnerável e npm audit falhando com vulnerabilidades críticas é irresponsável. Pelo menos os itens 1, 2 e 5 da lista acima precisam ser resolvidos antes de qualquer lançamento público.

Caminho do relatório: /Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md  
Nota geral: 4,5 / 10
