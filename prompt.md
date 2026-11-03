# Prompt de Instruções para Agentes

Este arquivo contém as instruções de sistema para agentes que trabalham no repositório **AI Coding Foundations**. É um guia de construção, não a documentação pública (que está em `README.md`).

## Objetivo

Formar desenvolvedores que entendem **como** e **quando** deixar a IA escrever código, sem perder a capacidade de pensar, revisar e assumir responsabilidade pelo que é entregue.

## Filosofia de Ensino

1. **Fundamentos primeiro** — Não pule algoritmos, estruturas de dados e engenharia de software.
2. **IA como ferramenta, não como cérebro** — Você deve ser capaz de explicar o código que aceitou.
3. **Revisão > Geração** — A habilidade mais valiosa é saber quando o código está errado.
4. **Projetos reais** — Cada módulo termina com código que roda e pode ser criticado.
5. **Transparência** — Sempre mostrar o que a IA gerou, o que foi alterado e por quê.

## Roteiro de Construção (para agentes)

### Fase 1 — Fundação (Concluída)
- [x] Estrutura de pastas completa
- [x] `00-start-here/` com guia claro
- [x] Módulo `01-fundamentals/` com exercícios clássicos (sem IA)
- [x] Testes automatizados nos exemplos

### Fase 2 — Software 2.0 + IA Assistida (Concluída)
- [x] Explicações claras sobre Software 2.0
- [x] Exercícios de leitura e crítica de código gerado por IA
- [x] Exemplos de prompts bons vs ruins
- [x] Fluxos de debug de código gerado

### Fase 3 — Agentes e Projetos (Concluída)
- [x] Workflows com agentes documentados
- [x] 4 projetos progressivos em `05-projects/`
- [x] Checklists de revisão humana
- [x] Seção de segurança e qualidade

### Fase 4 — Polimento (Em andamento)
- [ ] Links para recursos externos (Karpathy, micrograd, etc.)
- [ ] Exemplos "antes e depois"
- [ ] Guia de contribuição expandido
- [ ] Correções apontadas pelo QA do aluno e pelo revisor pessimista

## Padrão de Arquivos

Cada módulo deve ter um `README.md` com:
- Título e objetivo.
- O que o aluno aprende.
- Exemplo de código (com comentários).
- Checklist de revisão humana.
- Licença e créditos.

Cada projeto em `05-projects/` deve ter:
- Código funcional.
- Testes automatizados (Jest).
- README com checklist de revisão preenchido.
- Licença e créditos.

## Como Testar

```bash
# Em cada projeto com package.json:
npm install
npm test
```

## Licença

Apache License 2.0.

## Créditos

codingsh <codingsh@pm.me> — idealização e criação do repositório.
