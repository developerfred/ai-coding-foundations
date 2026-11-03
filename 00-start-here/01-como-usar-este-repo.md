# Como usar este repositório

Bem-vindo ao **AI Coding Foundations**. Este guia rápido ajuda você a navegar pelo repositório e tirar o máximo proveito dele.

## O que você vai encontrar aqui

Este repositório é educacional. O objetivo é formar desenvolvedores que entendem **como** e **quando** deixar a IA escrever código, sem perder a capacidade de pensar, revisar e assumir responsabilidade pelo que é entregue.

Os módulos são:

| Módulo | O que aborda |
|--------|--------------|
| `00-start-here` | Guia de uso e pré-requisitos (você está aqui) |
| `01-fundamentals` | Algoritmos, estruturas de dados, sistemas e engenharia de software |
| `02-software-2.0` | O que é Software 2.0, gradient descent e LLMs |
| `03-ai-assisted-coding` | Leitura crítica de código gerado, prompting, debug, testes |
| `04-agentic-workflows` | Trabalhar com agentes de código, revisão humana, segurança |
| `05-projects` | Projetos práticos progressivos |
| `examples/` | Exemplos bom vs ruim e antes/depois |
| `resources/` | Links e materiais externos |

## Filosofia em resumo

1. **Fundamentos primeiro** — não pule algoritmos e engenharia de software.
2. **IA como ferramenta, não como cérebro** — você deve explicar o código que aceitou.
3. **Revisão &gt; Geração** — saber quando o código está errado é a habilidade mais valiosa.
4. **Projetos reais** — cada módulo termina com código que roda.
5. **Transparência** — sempre mostre o que a IA gerou e o que você alterou.

## Como estudar

1. Leia a teoria do módulo.
2. Faça os exercícios **sem IA** primeiro (quando for fundamentos).
3. Quando usar IA, sempre revise criticamente o resultado.
4. Rode os testes, execute o código, entenda cada linha.
5. Documente o que mudou e por quê.

## Pré-requisitos

Veja `02-pre-requisitos.md` para saber o que instalar antes de começar.

## Como rodar os projetos

Cada projeto em `05-projects/` tem seu próprio `package.json` e README. Para rodar qualquer um:

```bash
# 1. Entre na pasta do projeto
cd 05-projects/01-todo-app-com-revisao   # ou outro projeto

# 2. Instale as dependências (quando houver package.json)
npm install

# 3. Rode os testes
npm test

# 4. Para projetos com servidor (ex: API), inicie
npm start
```

Projetos sem `package.json` (ex: Todo App com HTML/JS) podem ser abertos diretamente no navegador.

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
