# Segurança e Qualidade

Boas práticas para evitar dívida técnica e falhas de segurança ao usar agentes de código.

## Segurança

### Nunca confie cegamente no código gerado

A IA pode sugerir:
- Bibliotecas desatualizadas ou maliciosas.
- Algoritmos criptográficos fracos.
- Exposição acidental de dados sensíveis.

### Regras de ouro

1. **Nunca coloque segredos no código.** Use variáveis de ambiente (`.env`).
   Veja o arquivo [`.env.example`](../.env.example) para um modelo prático. Nunca commite o `.env` — adicione-o ao `.gitignore`.
2. **Valide toda entrada do usuário.** Nunca confie no que vem do frontend ou da API.
3. **Use dependências mínimas.** Quanto menos bibliotecas, menor a superfície de ataque.
4. **Mantenha dependências atualizadas.** Rode `npm audit` ou equivalente regularmente.

## Qualidade

### Evite dívida técnica gerada por IA

A IA tende a gerar código que funciona, mas pode ser:
- Duplicado.
- Mal organizado.
- Sem tipos ou com tipos fracos.

### Como evitar

- Peça para a IA seguir os princípios SOLID.
- Peça refatoração se o código ficar grande demais.
- Mantenha funções pequenas e com uma única responsabilidade.
- Use TypeScript (ou equivalent
e) para tipos explícitos.

## Ferramentas recomendadas

| Ferramenta | Para quê |
|------------|----------|
| ESLint / Pylint | Análise estática de código |
| SonarQube | Qualidade e segurança |
| Snyk / npm audit | Vulnerabilidades em dependências |
| Prettier | Formatação consistente |

---

**Licença**: Apache License 2.0  
**Créditos**: codingsh <codingsh@pm.me>
