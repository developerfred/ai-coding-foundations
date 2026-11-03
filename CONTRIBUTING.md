# Guia de Contribuição

Obrigado por querer contribuir com o **AI Coding Foundations**!

## Filosofia

Toda contribuição deve seguir: **fundamentos + crítica + clareza**.

Sempre inclua:
1. **Explicação** — o que é, por que importa.
2. **Código funcional** — que roda e pode ser testado.
3. **Testes** (quando fizer sentido).
4. **Notas de revisão** — o que foi revisado e por quê.

## Como contribuir

### 1. Escolha um módulo ou projeto

Veja o status no `README.md`. Escolha um item marcado como "A fazer" ou que precise de melhorias.

### 2. Crie uma branch

```bash
git checkout -b sua-branch
```

### 3. Desenvolva

Siga o padrão de arquivos de cada módulo:
- `README.md` com título, objetivo, o que o aluno aprende, exemplo de código comentado, checklist de revisão humana, licença e créditos.
- Código funcional (quando aplicar).
- Testes automatizados (quando aplicar).

### 4. Teste suas mudanças

```bash
npm test          # ou equivalente do projeto
npm run lint      # se houver ESLint configurado
```

### 5. Faça o commit

Use o padrão de commits:

```
tipo: descrição curta

Corpo opcional com detalhes
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Exemplo:
```
feat: adiciona testes Jest ao projeto de API

- Substitui assert caseiro por Jest + supertest
- Adiciona casos de borda (nome vazio, ID inválido, item inexistente)
```

### 6. Abra um Pull Request

Descreva o que mudou, por quê e como testar.

## Código de conduta

- Seja respeitoso com outros contribuidores.
- Revise criticamente o código antes de enviar.
- Nunca commite segredos, senhas ou tokens.
- Mantenha o foco em educação e clareza.

## Licença

Ao contribuir, você concorda que suas contribuições estarão sob a **Apache License 2.0**.

## Créditos

Idealização e criação: **codingsh** <codingsh@pm.me>
