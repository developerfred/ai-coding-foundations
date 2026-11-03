# RELATÓRIO PESSIMISTA — Reavaliação Definitiva do Repositório AI Coding Foundations

**Data:** 03/11/2026  
**Revisor:** Pessimista (revisor extremamente crítico)  
**Repositório:** /Volumes/MASS/ai-code-foundation/  
**Histórico de notas:** 3,5 → 4,5 → 5,5 → 5,5 → 6,0 → 4,5/10  
**Escopo:** Verificar ponto a ponto se as 10 correções reportadas estão realmente aplicadas e funcionais. Critério: correção só conta se está correta, completa e funcional, não se foi apenas prometida.

---

## Verificação das 10 correções reportadas

| # | Correção reportada | Status | Veredito |
|---|-------------------|--------|----------|
| 1 | Landing HTML: subtítulo pt-BR diz apenas "EPUB" (não "EPUB e MOBI") | ✅ VERDADEIRO | `landing/index.html` linha 458 (pt-BR) e linha 517 (EN): "O livro está disponível em EPUB...". Nenhuma menção a MOBI em qualquer idioma. Entregue. |
| 2 | downloads/README.md não cita MOBI como formato disponível | ✅ VERDADEIRO | Linha 7: apenas EPUB na tabela. Linha 13: "Atualmente apenas o EPUB está disponível para download." Sem MOBI. Entregue. |
| 3 | QA_STUDENT.md reescrito como modelo limpo, sem referências ao MOBI | ❌ FALHA | O documento tem estrutura limpa ✅, MAS ainda cita MOBI duas vezes: linha 23 ("...MOBI removido") e linha 56 ("Download MOBI disponível? ❌ Não — apenas EPUB. Para MOBI, converter o EPUB com Calibre."). Um documento que deve ser modelo para o próximo aluno não deve citar um formato inexistente. Correção não entregue integralmente. |
| 4 | ESLint REMOVIDO de todos os 4 projetos (sem .eslintrc.json, sem script lint) | ✅ VERDADEIRO | Busca por `**/.eslintrc*` retornou zero arquivos. Nenhum dos 4 `package.json` tem script `lint` nem `eslint` nas dependências. Entregue conforme solicitado. (Nota: remover algo quebrado não é sinônimo de qualidade — veja seção de problemas.) |
| 5 | npm audit com --audit-level=critical no projeto 3 | ⚠️ PARCIAL / MÁSCARA | O script `"audit": "npm audit --audit-level=critical"` existe no `05-projects/03-sistema-com-verificacao-automatica/package.json` e, na prática com o npm 11.6.1, sai com **código 0** (não quebra). PORÉM: foram encontradas **32 vulnerabilidades (2 low, 24 moderate, 4 high, 2 critical)** — incluindo critical de `form-data`-like e outras. Nenhuma foi corrigida (`npm audit fix` nunca rodado). É máscara, não correção. |
| 6 | aria-live="polite" na seção de downloads da landing | ✅ VERDADEIRO | Linha 453: `<section id="downloads" aria-live="polite">`. Entregue e funcional. |
| 7 | TypeScript removido dos pré-requisitos | ✅ VERDADEIRO | `00-start-here/02-pre-requisitos.md` linha 7 cita apenas Node.js/npm. Linha 17: "Todo o código do repositório está em JavaScript puro. Nenhuma dependência de TypeScript." Entregue. |
| 8 | 32 testes Jest passando em todos os 4 projetos | ✅ VERDADEIRO (verificado) | Executado localmente: Projeto 1 = 8, Projeto 2 = 10, Projeto 3 = 12, Projeto 4 = 2. **Total 32/32 passam, exit code 0.** Este é o único ponto forte real do repositório. |
| 9 | app.listen() protegido com require.main === module | ✅ VERDADEIRO | `05-projects/02-api-com-agente/server.js` linha 96: `if (require.main === module) {` e o `app.listen` está na linha 98, DENTRO do bloco. |
| 10 | app.listen() protegido com require.main === module | ✅ VERDADEIRO | `05-projects/04-projeto-final/src/app.js` linha 31: `if (require.main === module) {` e o `app.listen` está na linha 33, DENTRO do bloco. (Itens 9 e 10 são duplicados na lista do usuário.) |

**Resumo das 10:** 8 verdadeiras (1, 2, 4, 6, 7, 8, 9, 10), 1 parcial/máscara (5), 1 falha (3). Duas correções têm ressalvas severas.

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

Obs.: o projeto 3 usa `jest ^25.1.0` (versão muito antiga) e emite `DeprecationWarning: fs.F_OK is deprecated`, mas os testes passam.

---

## Problemas que PERMANECEM (lista dura)

### 1. QA_STUDENT.md ainda cita MOBI (correção 3 não entregue)
Linhas 23 e 56 mencionam MOBI como "removido" ou "não disponível". Em um documento que deve ser um modelo limpo para o próximo aluno, referenciar um formato que não existe gera confusão desnecessária. Não está limpo.

### 2. npm audit não corrige nada — apenas mascara (CRÍTICO)
O projeto 3 reporta **32 vulnerabilidades, incluindo 2 críticas**. `npm audit --audit-level=critical` não remove vulnerabilidades; apenas ajusta o nível de severidade para não quebrar o comando. As vulnerabilidades críticas continuam lá. Projetos 1, 2 e 4 nem script de audit têm. Não houve `npm audit fix`, nem pinagem de versões, nem avaliação de risco.

### 3. Dependências antigas/vulneráveis no projeto 3
`jest ^25.1.0` é obsoleto e arrasta pacotes vulneráveis (`request`, `tough-cookie`, `uuid`, `qs`, `node-notifier`, etc.). Gera `DeprecationWarning` e é um risco de segurança ativo.

### 4. Nenhum projeto tem lint (foi removido, não substituído)
A correção 4 removeu o ESLint de todos os projetos. Como o usuário pediu remoção, conta como entregue. Mas do ponto de vista de qualidade, o repositório ficou sem qualquer mecanismo de análise estática. Não há lint, não há consistência de estilo, não há gate de qualidade de código.

### 5. Não há CI/CD
Não há GitHub Actions nem qualquer pipeline que rode testes, lint ou audit em todos os 4 projetos. Uma regressão pode entrar silenciosamente.

### 6. Apenas 1 de 4 projetos tem script de audit
Projetos 1, 2 e 4 não têm `npm audit`. Não há cobertura de segurança uniforme.

---

## Nota geral atualizada

| Dimensão | Peso | Nota | Comentário |
|----------|------|------|------------|
| Testes funcionam (32 passando, Jest + supertest) | 20% | 9,0 | Todos passam, isolamento da API funcionando. Único ponto forte real. |
| Correções reportadas realmente aplicadas e funcionais | 20% | 6,0 | 8 de 10 verdadeiras, mas 1 falha (QA_STUDENT ainda cita MOBI) e 1 máscara (audit não corrige vulnerabilidades críticas). |
| Segurança (npm audit) | 15% | 2,0 | 32 vulnerabilidades (2 críticas) presentes, não corrigidas. --audit-level=critical apenas mascara. |
| Qualidade do código (lint, análise estática) | 15% | 2,0 | ESLint removido de todos os projetos (sem substituto). Sem gate de qualidade. |
| Documentação consistente (README, QA, landing) | 15% | 5,0 | MOBI removido da landing e downloads/README ✅, mas QA_STUDENT.md ainda cita MOBI. |
| Boas práticas (CI, consistência entre projetos, dependências) | 10% | 2,0 | Sem CI, sem lint, projeto 3 com jest ^25.1.0 obsoleto, audit só no projeto 3. |
| **PONDERADA FINAL** | **100%** | **4,5** | |

**Nota geral: 4,5 / 10**

A nota não sai do 4,5 anterior porque, embora as correções de superfície estejam agora realmente aplicadas (MOBI removido da landing/downloads, aria-live, TypeScript removido, 32 testes confirmados, app.listen protegido), a base técnica continua fraca: vulnerabilidades críticas não corrigidas (apenas mascaradas), QA_STUDENT.md ainda cita MOBI, ausência completa de lint e de CI, e dependências obsoletas. O repositório está "arrumado na superfície" mas não é tecnicamente sólido.

---

## O que exatamente faltaria para chegar a 10/10 (realista)

1. **Remover TODA referência ao MOBI do QA_STUDENT.md** (linhas 23 e 56), deixando o documento completamente limpo como modelo para o próximo aluno.
2. **Corrigir as vulnerabilidades de segurança:** executar `npm audit fix` (e `--force` quando necessário) até que `npm audit --audit-level=moderate` saia com código 0 em todos os projetos. Não basta mascarar com `--audit-level=critical`.
3. **Atualizar dependências obsoletas**, especialmente `jest ^25.1.0` no projeto 3 (arrasta pacotes vulneráveis e gera deprecation warnings).
4. **Adicionar scripts de lint e audit aos 4 projetos** para consistência (ou, no mínimo, manter uma configuração de qualidade funcional em todos).
5. **Adicionar CI (GitHub Actions)** que rode testes, lint e audit em todos os 4 projetos a cada push/PR.
6. **Manter os 32 testes passando** — garantir que futuras mudanças não quebrem a suíte.
7. **Adicionar documentação de contribuindo com gates de qualidade** (pré-requisito para PR: testes verdes, audit limpo).

---

## Conclusão

O repositório está em **4,5 / 10**. As correções cosméticas/de superfície (MOBI removido da landing e downloads, aria-live adicionado, TypeScript removido dos pré-requisitos, app.listen protegido, 32 testes realmente passando) estão corretas e confirmadas. Mas a base técnica continua quebrada ou ausente: vulnerabilidades críticas presentes e não corrigidas (apenas mascaradas pelo --audit-level=critical), QA_STUDENT.md ainda cita MOBI, nenhum projeto tem lint, não há CI/CD, e o projeto 3 usa dependências obsoletas.

**O repositório NÃO está pronto para publicação pública.** Publicar com vulnerabilidades críticas não corrigidas, documentação de QA que referencia formato inexistente e ausência total de gates de qualidade (lint/CI) é irresponsável. Pelo menos os itens 1, 2 e 5 da lista acima precisam ser resolvidos antes de qualquer lançamento público.

---

Caminho do relatório: /Volumes/MASS/ai-code-foundation/RELATORIO_PESSIMISTA.md  
Nota geral: 4,5 / 10  
Pronto para publicação pública: NÃO
