# Prompting Eficaz para Código

Aprenda a escrever prompts que gerem código mais seguro, legível e fácil de revisar.

## Princípios de prompting para código

| Princípio | O que fazer |
|-----------|-------------|
| **Seja específico** | Diga a linguagem, versão, framework e entrada/saída esperada. |
| **Peça explicação** | Peça para a IA comentar o código e explicar as decisões. |
| **Peça validação** | Peça para incluir validação de entrada e tratamento de erro. |
| **Peça testes** | Peça para gerar testes unitários junto com o código. |
| **Itere** | Não aceite a primeira versão. Peça melhorias e correções. |

## Modelo de prompt para código

```
Contexto: Estou construindo [tipo de aplicação] em [linguagem/versão].
Tarefa: [descrição clara do que o código deve fazer].
Entrada: [exemplo de dado de entrada].
Saída: [exemplo de dado esperado].
Requisitos:
- Incluir validação de entrada.
- Incluir tratamento de erro (try/catch ou equivalente).
- Comentar as decisões importantes.
- Gerar testes unitários para os casos principais.
- Seguir boas práticas de [linguagem].
```

## Exemplo: prompt ruim vs prompt bom

### ❌ Prompt ruim

> "faça uma função de login"

**Problemas:** sem linguagem, sem entrada/saída, sem segurança, sem testes. A IA vai inventar e pode gerar algo inseguro.

### ✅ Prompt bom

```
Contexto: API REST em Node.js (Express) com PostgreSQL.
Tarefa: criar endpoint POST /login que autentique um usuário por email e senha.
Entrada: JSON { email: string, senha: string }.
Saída: JSON { token: string, usuario: { id, email } } ou erro 401.
Requisitos:
- Validar que email e senha estão presentes.
- Comparar senha com hash (bcrypt).
- Retornar 401 se credenciais inválidas.
- Gerar teste unitário com Jest.
- Comentar decisões de segurança.
```

## Técnicas avançadas

- **Chain-of-thought:** peça para a IA pensar passo a passo antes de gerar o código.
- **Few-shot:** mostre exemplos de código bom que você já escreveu para a IA seguir o estilo.
- **Refinamento:** gere o código, depois peça "revise este código e aponte problemas de segurança".

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
