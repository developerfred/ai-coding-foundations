# AI Coding Foundations  
### Do Software 1.0 ao Software 2.0 — Repositório Educacional

> Repositório educacional focado em formar desenvolvedores que entendem **como** e **quando** deixar a IA escrever código, sem perder a capacidade de pensar, revisar e assumir responsabilidade pelo que é entregue.

Inspirado na visão de Andrej Karpathy (Software 2.0 / "Gradient descent can write code better than you") e adaptado para a realidade atual de LLMs e agentes de código.

---

## Objetivo do Repositório

Ensinar novos desenvolvedores a:

- Entender a diferença entre **escrever código** e **orquestrar código**.
- Manter fundamentos sólidos (algoritmos, estruturas de dados, sistemas, engenharia de software).
- Usar IA de forma crítica (não apenas gerar, mas **avaliar**, **corrigir** e **evoluir**).
- Trabalhar com agentes de código de forma profissional.
- Evitar o efeito "prompt → código → deploy sem entender".

---

## Estrutura do Repositório

```
ai-coding-foundations/
├── README.md
├── LICENSE
├── 00-start-here/
│   ├── 01-como-usar-este-repo.md
│   └── 02-pre-requisitos.md
├── 01-fundamentals/
│   ├── 01-algoritmos-e-complexidade/
│   ├── 02-estruturas-de-dados/
│   ├── 03-sistemas-e-redes/
│   └── 04-engenharia-de-software/
├── 02-software-2.0/
│   ├── 01-o-que-e-software-2.0.md
│   ├── 02-gradient-descent-escreve-programas/
│   └── 03-de-rnns-a-llms.md
├── 03-ai-assisted-coding/
│   ├── 01-leitura-de-codigo-gerado/
│   ├── 02-prompting-eficaz-para-codigo/
│   ├── 03-debug-e-correcao-de-codigo-ia/
│   └── 04-testes-e-verificacao/
├── 04-agentic-workflows/
│   ├── 01-agentes-vs-autocomplete/
│   ├── 02-fluxo-de-trabalho-com-agentes/
│   ├── 03-revisao-humana-no-loop/
│   └── 04-seguranca-e-qualidade/
├── 05-projects/
│   ├── 01-todo-app-com-revisao/
│   ├── 02-api-com-agente/
│   ├── 03-sistema-com-verificacao-automatica/
│   └── 04-projeto-final/
├── examples/
│   ├── bom-vs-ruim/
│   └── before-after/
├── resources/
│   └── links.md
├── landing/
│   ├── index.html
│   └── assets/
└── downloads/
    ├── book.epub
    └── book.mobi
```

---

## Filosofia de Ensino

1. **Fundamentos primeiro** — Não pule algoritmos, estruturas de dados e engenharia de software.
2. **IA como ferramenta, não como cérebro** — Você deve ser capaz de explicar o código que aceitou.
3. **Revisão > Geração** — A habilidade mais valiosa é saber quando o código está errado.
4. **Projetos reais** — Cada módulo termina com código que roda e pode ser criticado.
5. **Transparência** — Sempre mostrar o que a IA gerou, o que foi alterado e por quê.

---

## Roteiro de Construção (para agentes)

### Fase 1 — Fundação (Prioridade Alta)
- [ ] Criar estrutura de pastas completa
- [ ] Escrever `00-start-here/` com guia claro
- [ ] Criar módulo `01-fundamentals/` com exercícios clássicos (sem IA)
- [ ] Adicionar testes automatizados nos exemplos

### Fase 2 — Software 2.0 + IA Assistida
- [ ] Escrever explicações claras sobre Software 2.0
- [ ] Criar exercícios de **leitura e crítica** de código gerado por IA
- [ ] Exemplos de prompts bons vs ruins
- [ ] Fluxos de debug de código gerado

### Fase 3 — Agentes e Projetos
- [ ] Documentar workflows com agentes (Claude, Cursor, etc.)
- [ ] Criar 4 projetos progressivos em `05-projects/`
- [ ] Incluir checklists de revisão humana
- [ ] Adicionar seção de segurança e qualidade

### Fase 4 — Polimento
- [ ] Links para recursos externos (Karpathy, micrograd, etc.)
- [ ] Exemplos "antes e depois"
- [ ] Guia de contribuição

---

## Módulos Principais (Conteúdo Esperado)

### 01 - Fundamentals
Exercícios clássicos sem IA para construir base:
- Complexidade de algoritmos
- Estruturas de dados essenciais
- Princípios de design (SOLID, DRY, etc.)
- Testes e versionamento

### 02 - Software 2.0
- O que é gradient descent "escrevendo" programas
- Diferença entre Software 1.0 e 2.0
- Por que LLMs conseguem gerar código útil
- Limitações atuais

### 03 - AI-Assisted Coding
- Como ler código gerado criticamente
- Técnicas de prompting para código
- Estratégias de verificação
- Quando **não** aceitar o código da IA

### 04 - Agentic Workflows
- Como trabalhar com agentes de forma controlada
- Revisão humana no loop
- Gestão de contexto e qualidade
- Evitar dívida técnica gerada por IA

### 05 - Projects
Projetos práticos com instruções claras de:
- O que o agente deve gerar
- O que o aluno deve revisar e modificar
- Critérios de qualidade

---

## Como Contribuir

1. Escolha um módulo ou projeto em aberto.
2. Siga a filosofia: **fundamentos + crítica + clareza**.
3. Sempre inclua:
   - Explicação
   - Código funcional
   - Testes (quando fizer sentido)
   - Notas de revisão

---

## Recursos Recomendados

- Andrej Karpathy — Software 2.0
- micrograd / nn-zero-to-hero (Karpathy)
- Documentação de ferramentas (Claude Code, Cursor, etc.)
- Artigos sobre code review e qualidade de software

---

## Status

| Módulo                  | Status      | Responsável |
|-------------------------|-------------|-------------|
| 00 - Start Here         | Concluído   | codingsh    |
| 01 - Fundamentals       | Concluído   | codingsh    |
| 02 - Software 2.0       | Concluído   | codingsh    |
| 03 - AI-Assisted Coding | Concluído   | codingsh    |
| 04 - Agentic Workflows  | Concluído   | codingsh    |
| 05 - Projects           | Concluído   | codingsh    |

---

## Licença e Créditos

**Licença**: Apache License 2.0 — totalmente aberta, permissiva, permite uso comercial, modificação e distribuição.

**Créditos**: codingsh <codingsh@pm.me> — idealização e criação do repositório.

---

**Criado para** formar desenvolvedores que usam IA sem abrir mão do entendimento.
